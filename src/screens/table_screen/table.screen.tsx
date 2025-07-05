import "./table.screen.scss";
import { useSetState } from "utils/functions.utils";
import TableComponent from "common_components/ui/table/table.common_component";

const TableScreen = (props: any) => {
  const initialValues = [
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
    values: [...initialValues],
  });

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
  };

  const allocationPercentage = (data: any) => {
    calculateFunction(state.selectItems, state.value);
  };

  const allocationVal = (data: any) => {
    calculateVal(state.selectItems, state.value);
  };

  const calculateVal = (data: any, value: any) => {
    const values = [...state.values];
    if (!data || !value) return;

    if (data.label === "Furniture" || data.label === "Electronics") {
      const findIndex = values.findIndex(
        (item: any) => item.label === data.label
      );
      if (findIndex === -1) {
        alert("Data not found");
        return;
      }
      let initialValue = initialValues.find((item: any) => item.label === data.label)?.value || 0;
      values[findIndex].value = parseFloat(value);

      let result: any = ((parseFloat(value) - initialValue) / initialValue) * 100;
      values[findIndex].variance = Math.abs(result).toFixed(2);

      const currentChildren = values.filter(
        (item: any) =>
          item.id === data.id && data.id !== item.label.toLowerCase()
      );
      const currentTotal = currentChildren.reduce(
        (prev: number, acc: { value: number }) => prev + (acc.value || 0),
        0
      );
      const table1 = values.findIndex(
        (item: any) =>
          item.id === data.id && data.id !== item.label.toLowerCase()
      );
      if (table1 !== -1) {
        const tablesContribution = (currentChildren[0].value / currentTotal) * 100;
        const chairsContribution = (currentChildren[1].value / currentTotal) * 100;
        let table1Value = (tablesContribution / 100) * parseFloat(value);
        let table2Value = (chairsContribution / 100) * parseFloat(value);
        values[table1].value = parseFloat(table1Value.toFixed(2));
        values[table1 + 1].value = parseFloat(table2Value.toFixed(2));
        const originalChildren = initialValues.filter(
          (item: any) =>
            item.id === data.id && data.id !== item.label.toLowerCase()
        );
        let varianceOne = ((table1Value - originalChildren[0].value) / originalChildren[0].value) * 100;
        let varianceTwo = ((table2Value - originalChildren[1].value) / originalChildren[1].value) * 100;
        values[table1].variance = Math.abs(varianceOne).toFixed(2);
        values[table1 + 1].variance = Math.abs(varianceTwo).toFixed(2);
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
      let result: any = ((prevValue - parseFloat(value)) / prevValue) * 100;
      result = Math.abs(result.toFixed(2));
      values[findIndex].variance = result;
      values[findIndex].value = parseFloat(value);
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
        values[findParentIndex].variance = Math.abs(variance).toFixed(2);
      }
    }
    setState({ values });
  };

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