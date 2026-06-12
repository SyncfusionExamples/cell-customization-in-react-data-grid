import {
  ColumnDirective, ColumnsDirective, GridComponent,
  Inject, Page
} from '@syncfusion/ej2-react-grids';
import { data } from './datasource';
import './App.css';

function App() {

  const selectOptions = {
    type: 'Multiple',
    mode: 'Cell'
  }

  const customizeCell = (args) => {
    if (args.column.field === "Freight") {
      if (args.data[args.column.field] <= 30) {
        args.cell.classList.add('below-30');
      } else {
        args.cell.classList.add('above-30');
      }
    }
  }

  let grid;
  const dataBound = (() => {
    let header = grid.getHeaderContent().querySelector('.e-headercell');
    header.style.backgroundColor = '#ede9fe';
    header.style.color = '#5b21b6';
    let cell = grid.getCellFromIndex(1, 2);
    cell.style.backgroundColor = '#ccfbf1';
    cell.style.color = '#0f766e';
  });

  const template = (props) => {
    return <img src={`https://picsum.photos/id/${Math.floor(Math.random() * 100)}/50/50`}
      alt={props.EmployeeID} />;
  }

  const conditionalTemplate = (props) => {
    if (props.Freight > 100) {
      return (<span>Platinum</span>);
    } else if (props.Freight > 75) {
      return (<span>Gold</span>);
    } else if (props.Freight > 50) {
      return (<span>Silver</span>);
    }
  }

  return <div style={{ padding: '20px' }}>
    <GridComponent dataSource={data} pageSettings={{ pageSize: 5 }}
      allowPaging={true} enableHover={false} selectionSettings={selectOptions}
      queryCellInfo={customizeCell} ref={g => grid = g} dataBound={dataBound}>
      <ColumnsDirective>
        <ColumnDirective headerText='Image' Width='180' textAlign='Center'
          template={template} />
        <ColumnDirective field='OrderID' headerText='Invoice ID' textAlign='Right'
          width='100' isPrimaryKey={true} />
        <ColumnDirective field='CustomerID' headerText='Customer ID' width='150'
          customAttributes={{ class: 'custom-css' }} />
        <ColumnDirective field='ShipCountry' headerText='Ship Country' />
        <ColumnDirective field='ShipName' headerText='Ship Name' />
        <ColumnDirective field='Freight' textAlign='Right' format='C2' width='100' />
        <ColumnDirective headerText='Subscription' Width='180' textAlign='Center'
          template={conditionalTemplate} />
      </ColumnsDirective>
      <Inject services={[Page]} />
    </GridComponent></div>
}

export default App
