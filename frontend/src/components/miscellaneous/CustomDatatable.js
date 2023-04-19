import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";
import "datatables.net-dt/js/dataTables.dataTables.min.js";
import "datatables.net-responsive-dt/js/responsive.dataTables.min.js";

function CustomDatatable({ data }) {
  const tbColumns = [];
  for (let d of Object.keys(data[0])) {
    tbColumns.push({ data: d });
  }
  useEffect(() => {
    $(document).ready(function () {
      $("#datatable").DataTable({
        responsive: true,
        paging: true,
        searching: true,
        ordering: true, // enable sorting
        columnDefs: [{ targets: "no-sort", orderable: false }],
        language: {
          lengthMenu: "Show _MENU_ entries",
          search: "Search:",
          paginate: {
            first: "First",
            last: "Last",
            next: "Next",
            previous: "Previous",
          },
        },
        data: data,
        columns: tbColumns,
      });
    });
  }, [data]);

  return (
    <div className="datatable">
      <table id="datatable" className="display compact">
        <thead>
          <tr>
            {tbColumns.map((item) => (
              <th>{item.data}</th>
            ))}
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}

export default CustomDatatable;
