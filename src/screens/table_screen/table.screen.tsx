import React from "react";
import "./table.screen.scss";
import { useSetState } from "utils/functions.utils";
import TableComponent from "common_components/ui/table/table.common_component";

const TableScreen = (props: any) => {
  const values = [
    {
      label: "Electronics",
      value: 1500,
      variance: 0,
      input: true,
      button1: true,
      button2: true,
      id: "electronics",
    },
    {
      label: "--Phones",
      value: 800,
      variance: 0,
      input: true,
      button1: true,
      button2: true,
      id: "electronics",
    },
    {
      label: "--Laptops",
      value: 700,
      variance: 0,
      input: true,
      button1: true,
      button2: true,
      id: "electronics",
    },
    {
      label: "Furniture",
      value: 1000,
      variance: 0,
      input: true,
      button1: true,
      button2: true,
      id: "furniture",
    },
    {
      label: "--Tables",
      value: 300,
      variance: 0,
      input: true,
      button1: true,
      button2: true,
      id: "furniture",
    },
    {
      label: "--Chairs",
      value: 700,
      variance: 0,
      input: true,
      button1: true,
      button2: true,
      id: "furniture",
    },
  ];
  const [state, setState] = useSetState({
    loading: false,
    selectItems: null,
    value: null,
    values: values,
  });

  //   table

  const tableHeader = [
    {
      label: "Label",
      value: "label",
    },
    {
      label: "value",
      value: "value",
    },
    {
      label: "Input",
      value: "input",
    },
    {
      label: "Allocation %",
      value: "button1",
    },
    {
      label: "Allocation Val",
      value: "button2",
    },
    {
      label: "Variance %",
      value: "variance",
    },
  ];

  const handleChange = (value: number, data: any) => {
    setState({ selectItems: data, value });
    // calculateFunction(data, value);
  };

  const allocationPercentage = (data: any) => {
    calculateFunction(state.selectItems, state.value);
  };

  const allocationVal = (data: any) => {
    calculateVal(state.selectItems, state.value);
  };

  const calculateVal = (data: any, value: any) => {
    const values = state.values;
    if (!data) return;

    if (data.label === "Furniture" || data.label === "Electronics") {
      const findIndex = values.findIndex(
        (item: any) => item.label === data.label
      );
      if (findIndex === -1) {
        alert("Data not found");
        return;
      }
      let prev = values[findIndex].value;
      values[findIndex].value = value;
      let result: any = ((value - prev) / prev) * 100;
      values[findIndex].variance = Math.abs(result).toFixed(2);
      const table1 = values.findIndex(
        (item: any) =>
          item.id === data.id && data.id !== item.label.toLowerCase()
      );
      if (table1 !== -1) {
        let value1 = (values[table1].value / prev) * 100;
        let value2 = (values[table1 + 1].value / prev) * 100;
        let table1Value = (value1 / 100) * value;
        let table2Value = (value2 / 100) * value;
        let varianceOne =
          ((table1Value - values[table1].value) / values[table1].value) * 100;
        let varianceTwo =
          ((table2Value - values[table1 + 1].value) /
            values[table1 + 1].value) *
          100;
        values[table1].value = table1Value.toFixed(4);
        values[table1 + 1].value = table2Value.toFixed(4);
        values[table1 + 1].variance = varianceTwo;
      }
    } else {
      const findIndex = values.findIndex(
        (item: any) => item.label === data.label
      );
      if (findIndex === -1) {
        alert("Data not found");
        return;
      }

      let prevValue = values[findIndex].value;
      let result: any = ((prevValue - value) / prevValue) * 100;
      result = Math.abs(result.toFixed(2));
      values[findIndex].variance = result;
      values[findIndex].value = parseInt(value);
      // update Parent
      const findParentIndex = values.findIndex(
        (item: any) => item.id === data.id
      );

      if (findParentIndex === -1) {
        alert("Data not found");
        return;
      }

      let parentPrevValue = values[findParentIndex].value;
      const getChildrenValues = values.filter(
        (item: any) =>
          item.id === data.id && data.id !== item.label.toLowerCase()
      );
      if (getChildrenValues?.length > 0) {
        const subTotal = getChildrenValues.reduce(
          (prev: number, acc: { value: number }) => prev + (acc.value || 0),
          0
        );
        values[findParentIndex].value = subTotal;
        let variance = subTotal - parentPrevValue;
        variance = (variance / parentPrevValue) * 100;
        values[findParentIndex].variance = variance;
      }
    }
    setState({ values });
  };

  // calculate
  const calculateFunction = (data: any, value: any) => {
    const values = state.values;
    if (!data) return;

    // update children
    let result = (data.value * value) / 100;
    const findIndex = values.findIndex(
      (item: any) => item.label === data.label
    );
    if (findIndex === -1) {
      alert("Data not found");
      return;
    }
    values[findIndex].value += result;
    values[findIndex].variance = value;

    // update Parent
    const findParentIndex = values.findIndex(
      (item: any) => item.id === data.id
    );
    if (findParentIndex === -1) {
      alert("Data not found");
      return;
    }
    let prevValue = values[findParentIndex].value;
    values[findParentIndex].value += result;

    // getChildren
    const getChildrenValues = values.filter(
      (item: any) => item.id === data.id && data.id !== item.label.toLowerCase()
    );
    if (getChildrenValues?.length > 0) {
      const subTotal = getChildrenValues.reduce(
        (prev: number, acc: { value: number }) => prev + (acc.value || 0),
        0
      );
      let variance: number = subTotal - prevValue;
      variance = (variance / prevValue) * 100;
      values[findParentIndex].variance = variance.toFixed(2);
    } else {
      alert("Data not found");
      return;
    }
    setState({ values });
  };

  return (
    <div className="table_screen_container">
      <div className="table_header_content">
        <h3>Simple Hierarchical Table Website</h3>
      </div>
      <div className="table_section">
        <TableComponent
          loading={state.loading}
          headers={tableHeader}
          data={state.values}
          type="TABLE"
          onChange={(value: number, data: any) => handleChange(value, data)}
          allocationPercentage={(data: any) => allocationPercentage(data)}
          allocationVal={(data: any) => allocationVal(data)}
        />
      </div>
    </div>
  );
};

export default TableScreen;
