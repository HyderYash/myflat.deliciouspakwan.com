const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const executeQuery = require("../config/db");
const bcrypt = require("bcryptjs");

const registerUser = asyncHandler(async (req, res) => {
  console.log("here");
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  const userExists = await executeQuery(
    `SELECT * FROM flat_users WHERE USER_EMAIL = '${email}'`
  );
  if (userExists.length > 0) {
    res.status(400);
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  let sqlQuery = `INSERT INTO flat_users (USER_NAME, USER_DISPLAY_NAME, USER_PWD, USER_EMAIL, USER_AVATAR_COLOR, USER_LAST_LOGIN, USER_TYPE, USER_STATUS) VALUES
  ('${name}', '${name}', '${hashPass}', '${email}', '#9653cf', '0000-00-00 00:00:00', 'U', 'Y');`;
  await executeQuery(sqlQuery);
  const user = await executeQuery(
    `SELECT * FROM flat_users WHERE USER_EMAIL = '${email}'`
  );
  if (user.length > 0) {
    res.status(200).json({ TOKEN: generateToken(user[0]) });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const getPassfromDb = `SELECT ID, USER_PWD FROM flat_users WHERE USER_EMAIL = '${email}'`;
  const userPass = await executeQuery(getPassfromDb);
  if (await bcrypt.compare(password, userPass[0].USER_PWD)) {
    const sqlQuery = `SELECT * FROM flat_users WHERE USER_EMAIL = '${email}'`;
    const user = await executeQuery(sqlQuery);
    if (user.length > 0) {
      res.status(201).json({ TOKEN: generateToken(user[0]) });
    } else {
      res.status(400);
      throw new Error("Invalid Credentials");
    }
  } else {
    res.status(400);
    throw new Error("Invalid Password");
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await executeQuery(`SELECT * FROM flat_categories`);
  res.json(categories);
});

const addCategories = asyncHandler(async (req, res) => {
  const { CAT_NAME, CAT_STATUS } = req.body;
  await executeQuery(`INSERT INTO flat_categories (CAT_NAME, CAT_STATUS)
  VALUES ('${CAT_NAME}', '${CAT_STATUS}')`);
  res.json({ message: "Category Added Successfully" });
});

const getAllUtilities = asyncHandler(async (req, res) => {
  const categories = await executeQuery(`SELECT * FROM flat_utilities`);
  res.json(categories);
});

const addUtilities = asyncHandler(async (req, res) => {
  const { PAY_DATE, AMT, STATUS, CAT_ID } = req.body;
  const { ID } = req.user;
  await executeQuery(`INSERT INTO flat_utilities (PAY_DATE, AMT, STATUS, USER_ID, CAT_ID)
  VALUES ('${PAY_DATE}', '${AMT}', '${STATUS}', '${ID}', '${CAT_ID}')`);
  res.json({ message: "Utility Added Successfully" });
});

const getReports = asyncHandler(async (req, res) => {
  const { DATE_SELECTION } = req.body;
  let qryPrefix = `SELECT util.CAT_ID, cat.CAT_NAME, 
  SUM (AMT) as TOTAL_SUM 
  FROM flat_utilities as util, flat_categories as cat 
  WHERE util.CAT_ID = cat.ID`;
  let qrySuffix = ` GROUP BY CAT_ID;`;
  if (DATE_SELECTION !== "ALL") {
    qryPrefix += ` AND DATE(util.PAY_DATE) BETWEEN '${DATE_SELECTION}-01-01' AND '${DATE_SELECTION}-12-31'`;
  }
  let qry = qryPrefix + qrySuffix;
  const categories = await executeQuery(qry);
  res.json(categories);
});

module.exports = {
  registerUser,
  userLogin,
  getAllCategories,
  addCategories,
  addUtilities,
  getAllUtilities,
  getReports,
};
