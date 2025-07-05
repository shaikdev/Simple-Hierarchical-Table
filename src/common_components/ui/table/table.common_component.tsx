import { Fragment } from "react";
import "./table.common_component.scss";

interface ITableComponent {
  data: any;
  type: string;
  headers: any;
  loading: any;
  onChange: any;
  allocationPercentage: any;
  allocationVal: any;
}

const TableComponent = (props: ITableComponent) => {
  return (
    <>
      <div className="table_fix_header">
        <table>
          <thead>
            <tr>
              {props.headers &&
                props.headers.map((item: any, i: number) => {
                  return <th key={i}>{item.label}</th>;
                })}
            </tr>
          </thead>
          <tbody>
            {props.type === "TABLE" ? (
              props.data.length > 0 ? (
                props.data.map((row: any, rowIndex: number) => {
                  return (
                    <tr key={rowIndex}>
                      {props.headers.map((col: any, colIndex: number) => {
                        var value = row[props.headers[colIndex]?.value];
                        return (
                          <td className={`table_row_content`} key={colIndex}>
                            {col.label === "Label" ? (
                              value
                            ) : col.label === "Input" ? (
                              <Fragment>
                                <div className="patient_action_wrapper">
                                  <div>
                                    <div className="allocation_action_button_text">
                                      <input
                                        onChange={(e: any) =>
                                          props.onChange(e.target.value, row)
                                        }
                                        type="number"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </Fragment>
                            ) : col.label === "Allocation %" ? (
                              <div
                                onClick={() => props.allocationPercentage(row)}
                                className="action_button"
                              >
                                Allocation %
                              </div>
                            ) : col.label === "Allocation Val" ? (
                              <div
                                onClick={() => props.allocationVal(row)}
                                className="action_button"
                              >
                                Allocation Val
                              </div>
                            ) : (
                              <>
                                {`${value} ${
                                  col.label === "Variance %" ? "%" : ""
                                } `}
                              </>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              ) : (
                <div className="no_data_found">
                  {" "}
                  {props.loading ? "" : "No Data Found"}
                </div>
              )
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableComponent;
