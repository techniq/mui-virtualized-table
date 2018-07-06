import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import MuiTable from '../src';
import { createPersonData, createDessertData } from './data';

storiesOf('Basic', module)
  .add('default (empty)', () => (
    <MuiTable width={500} style={{ backgroundColor: 'white' }} />
  ))

  .add('simple', () => {
    const data = createPersonData(5);
    return (
      <MuiTable
        data={data}
        columns={[{ name: 'firstName' }, { name: 'lastName' }]}
        width={500}
        style={{ backgroundColor: 'white' }}
      />
    );
  })

  .add('responsive', () => {
    const data = createPersonData(5);
    return (
      <AutoSizer>
        {({ width, height }) => (
          <MuiTable
            data={data}
            columns={[{ name: 'firstName' }, { name: 'lastName' }]}
            width={width}
            style={{ backgroundColor: 'white' }}
          />
        )}
      </AutoSizer>
    );
  })
  .add('composite cells', () => {
    const data = createPersonData(1000);
    return (
      <div style={{ height: 'calc(100vh)' }}>
        <AutoSizer>
          {({ width, height }) => (
            <MuiTable
              data={data}
              columns={[
                {
                  name: 'fullName',
                  header: 'Name',
                  width: 180,
                  cell: d => `${d.firstName} ${d.lastName}`,
                  cellProps: { style: { paddingRight: 0 } }
                },
                { name: 'jobTitle', header: 'Job Title' },
                { name: 'jobArea', header: 'Job Area' }
              ]}
              width={width}
              maxHeight={height}
              includeHeaders={true}
              style={{ backgroundColor: 'white' }}
            />
          )}
        </AutoSizer>
      </div>
    );
  })
  .add('include headers', () => {
    const data = createPersonData(5);
    return (
      <MuiTable
        data={data}
        columns={[{ name: 'firstName' }, { name: 'lastName' }]}
        includeHeaders={true}
        width={500}
        style={{ backgroundColor: 'white' }}
      />
    );
  })

  .add('custom headers', () => {
    const data = createPersonData(5);
    return (
      <MuiTable
        data={data}
        columns={[
          { name: 'firstName', header: 'First Name' },
          { name: 'lastName', header: 'Last Name' }
        ]}
        includeHeaders={true}
        width={500}
        style={{ backgroundColor: 'white' }}
      />
    );
  })

  .add('fixed/freeze row(s)', () => {
    const data = createPersonData(1000);
    return (
      <div style={{ height: 'calc(100vh)' }}>
        <AutoSizer>
          {({ width, height }) => (
            <MuiTable
              data={data}
              columns={[
                {
                  name: 'fullName',
                  header: 'Name',
                  width: 180,
                  cell: d => `${d.firstName} ${d.lastName}`,
                  cellProps: { style: { paddingRight: 0 } }
                },
                { name: 'jobTitle', header: 'Job Title' },
                { name: 'jobArea', header: 'Job Area' }
              ]}
              width={width}
              maxHeight={height}
              includeHeaders={true}
              fixedRowCount={1}
              style={{ backgroundColor: 'white' }}
            />
          )}
        </AutoSizer>
      </div>
    );
  })
  .add('fixed/freeze column(s)', () => {
    const data = createPersonData(1000);
    return (
      <div style={{ height: 'calc(100vh)' }}>
        <AutoSizer>
          {({ width, height }) => (
            <MuiTable
              data={data}
              columns={[
                {
                  name: 'fullName',
                  header: 'Name',
                  width: 180,
                  cell: d => `${d.firstName} ${d.lastName}`,
                  cellProps: { style: { paddingRight: 0 } }
                },
                { name: 'jobTitle', header: 'Job Title', width: 400 },
                { name: 'jobArea', header: 'Job Area', width: 400 },
                { name: 'jobType', header: 'Job Type', width: 400 }
              ]}
              width={width}
              maxHeight={height}
              includeHeaders={true}
              fixedColumnCount={1}
              style={{ backgroundColor: 'white' }}
            />
          )}
        </AutoSizer>
      </div>
    );
  })
  .add('fixed/freeze both', () => {
    const data = createPersonData(1000);
    return (
      <div style={{ height: 'calc(100vh)' }}>
        <AutoSizer>
          {({ width, height }) => (
            <MuiTable
              data={data}
              columns={[
                {
                  name: 'fullName',
                  header: 'Name',
                  width: 180,
                  cell: d => `${d.firstName} ${d.lastName}`,
                  cellProps: { style: { paddingRight: 0 } }
                },
                { name: 'jobTitle', header: 'Job Title', width: 400 },
                { name: 'jobArea', header: 'Job Area', width: 400 },
                { name: 'jobType', header: 'Job Type', width: 400 }
              ]}
              width={width}
              maxHeight={height}
              includeHeaders={true}
              fixedRowCount={1}
              fixedColumnCount={1}
              style={{ backgroundColor: 'white' }}
            />
          )}
        </AutoSizer>
      </div>
    );
  })
  .add('row height', () => {
    const data = createDessertData();
    const orderBy = 'FullName desc';
    const [orderProp, orderDirection] = orderBy;
    return (
      <MuiTable
        data={data}
        columns={[
          {
            name: 'name',
            header: 'Dessert (100g serving)',
            cellProps: { style: { paddingRight: 0 } }
          },
          {
            name: 'calories',
            header: 'Calories',
            cellProps: { numeric: true }
          },
          { name: 'fat', header: 'Fat (g)', cellProps: { numeric: true } },
          { name: 'carbs', header: 'Carbs (g)', cellProps: { numeric: true } },
          {
            name: 'protein',
            header: 'Protein (g)',
            cellProps: { numeric: true }
          }
        ]}
        includeHeaders={true}
        width={900}
        rowHeight={24}
        style={{ backgroundColor: 'white' }}
      />
    );
  })
  .add('default cellProps', () => {
    const data = createDessertData();
    const orderBy = 'FullName desc';
    const [orderProp, orderDirection] = orderBy;
    return (
      <MuiTable
        data={data}
        columns={[
          {
            name: 'name',
            header: 'Dessert (100g serving)',
            cellProps: { style: { paddingRight: 0 } }
          },
          {
            name: 'calories',
            header: 'Calories',
            cellProps: { numeric: true }
          },
          { name: 'fat', header: 'Fat (g)', cellProps: { numeric: true } },
          { name: 'carbs', header: 'Carbs (g)', cellProps: { numeric: true } },
          {
            name: 'protein',
            header: 'Protein (g)',
            cellProps: { numeric: true }
          }
        ]}
        includeHeaders={true}
        width={900}
        cellProps={{ padding: 'dense' }}
        style={{ backgroundColor: 'white' }}
      />
    );
  })
  .add('cellProps as function', () => {
    const data = createDessertData();
    const orderBy = 'FullName desc';
    const [orderProp, orderDirection] = orderBy;
    return (
      <MuiTable
        data={data}
        columns={[
          {
            name: 'name',
            header: 'Dessert (100g serving)',
            cellProps: { style: { paddingRight: 0 } }
          },
          {
            name: 'calories',
            header: 'Calories',
            cellProps: { numeric: true }
          },
          { name: 'fat', header: 'Fat (g)', cellProps: { numeric: true } },
          { name: 'carbs', header: 'Carbs (g)', cellProps: { numeric: true } },
          {
            name: 'protein',
            header: 'Protein (g)',
            cellProps: { numeric: true }
          }
        ]}
        includeHeaders={true}
        width={900}
        cellProps={(column, rowData) =>
          column.name === 'fat' && rowData && rowData[column.name] > 10
            ? { style: { backgroundColor: 'rgba(255,0,0,.5)', color: 'white' } }
            : {}
        }
        style={{ backgroundColor: 'white' }}
      />
    );
  })
  .add('text overflow', () => {
    const data = createPersonData(10);
    return (
      <MuiTable
        data={data}
        columns={[
          {
            name: 'fullName',
            header: 'Name',
            width: 100,
            cell: d => `${d.firstName} ${d.lastName}`
          },
          { name: 'jobTitle', header: 'Job Title', width: 100 },
          { name: 'jobArea', header: 'Job Area', width: 100 }
        ]}
        width={300}
        includeHeaders={true}
        rowHeight={24}
        style={{ backgroundColor: 'white' }}
        // cellProps={{ padding: 'dense' }}
        cellProps={{ style: { paddingRight: 0 } }}
      />
    );
  })
  .add('clickable headers and cells', () => {
    const data = createPersonData(5);
    return (
      <AutoSizer>
        {({ width, height }) => (
          <MuiTable
            data={data}
            columns={[
              { name: 'firstName', header: 'First Name' },
              { name: 'lastName', header: 'Last Name', onHeaderClick: false }
            ]}
            width={width}
            style={{ backgroundColor: 'white' }}
            includeHeaders={true}
            onHeaderClick={column =>
              alert(`Clicked '${column.name}' header in column'`)
            }
            onCellClick={(column, data) =>
              alert(
                `Clicked cell in column '${column.name}' containing '${
                  data[column.name]
                }'`
              )
            }
          />
        )}
      </AutoSizer>
    );
  })
  .add('pagination', () => {
    const data = createPersonData(100);
    return (
      <AutoSizer>
        {({ width, height }) => (
          <PaginatedTable
            data={data}
            columns={[
              {
                name: 'fullName',
                header: 'Name',
                width: 180,
                cell: d => `${d.firstName} ${d.lastName}`,
                cellProps: { style: { paddingRight: 0 } }
              },
              { name: 'jobTitle', header: 'Job Title' },
              { name: 'jobArea', header: 'Job Area' }
            ]}
            width={width}
            includeHeaders={true}
            style={{ backgroundColor: 'white' }}
          />
        )}
      </AutoSizer>
    );
  });

storiesOf('Column widths', module)
  .add('fixed width (first column)', () => {
    const data = createPersonData(100);
    return (
      <div style={{ height: 'calc(100vh)' }}>
        <AutoSizer>
          {({ width, height }) => (
            <MuiTable
              data={data}
              columns={[
                {
                  name: 'fullName',
                  header: 'Name',
                  width: 180,
                  cell: d => `${d.firstName} ${d.lastName}`,
                  cellProps: { style: { paddingRight: 0 } }
                },
                { name: 'jobTitle', header: 'Job Title' },
                { name: 'jobArea', header: 'Job Area' }
              ]}
              width={width}
              maxHeight={height}
              includeHeaders={true}
              style={{ backgroundColor: 'white' }}
            />
          )}
        </AutoSizer>
      </div>
    );
  })
  .add('minWidth (first column)', () => {
    const data = createPersonData(100);
    return (
      <div style={{ height: 'calc(100vh)' }}>
        <AutoSizer>
          {({ width, height }) => (
            <MuiTable
              data={data}
              columns={[
                {
                  name: 'fullName',
                  header: 'Name',
                  minWidth: 180,
                  cell: d => `${d.firstName} ${d.lastName}`,
                  cellProps: { style: { paddingRight: 0 } }
                },
                { name: 'jobTitle', header: 'Job Title' },
                { name: 'jobArea', header: 'Job Area' }
              ]}
              width={width}
              maxHeight={height}
              includeHeaders={true}
              style={{ backgroundColor: 'white' }}
            />
          )}
        </AutoSizer>
      </div>
    );
  })
  .add('minWidth (all columns)', () => {
    const data = createPersonData(100);
    return (
      <div style={{ height: 'calc(100vh)' }}>
        <AutoSizer>
          {({ width, height }) => (
            <MuiTable
              data={data}
              columns={[
                {
                  name: 'fullName',
                  header: 'Name',
                  minWidth: 180,
                  cell: d => `${d.firstName} ${d.lastName}`,
                  cellProps: { style: { paddingRight: 0 } }
                },
                { name: 'jobTitle', header: 'Job Title', minWidth: 300 },
                { name: 'jobArea', header: 'Job Area', minWidth: 200 }
              ]}
              width={width}
              maxHeight={height}
              includeHeaders={true}
              style={{ backgroundColor: 'white' }}
            />
          )}
        </AutoSizer>
      </div>
    );
  })

  .add('percentage widths exceeding table width (40% each)', () => {
    const data = createPersonData(100);
    return (
      <div style={{ height: 'calc(100vh)' }}>
        <AutoSizer>
          {({ width, height }) => (
            <MuiTable
              data={data}
              columns={[
                {
                  name: 'fullName',
                  header: 'Name',
                  width: '40%',
                  cell: d => `${d.firstName} ${d.lastName}`,
                  cellProps: { style: { paddingRight: 0 } }
                },
                { name: 'jobTitle', header: 'Job Title', width: '40%' },
                { name: 'jobArea', header: 'Job Area', width: '40%' }
              ]}
              width={width}
              maxHeight={height}
              includeHeaders={true}
              style={{ backgroundColor: 'white' }}
            />
          )}
        </AutoSizer>
      </div>
    );
  });

storiesOf('maxHeight', module)
  .add('basic', () => {
    const data = createPersonData(100);
    return (
      <AutoSizer>
        {({ width, height }) => (
          <MuiTable
            data={data}
            columns={[
              {
                name: 'fullName',
                header: 'Name',
                width: 180,
                cell: d => `${d.firstName} ${d.lastName}`,
                cellProps: { style: { paddingRight: 0 } }
              },
              { name: 'jobTitle', header: 'Job Title' },
              { name: 'jobArea', header: 'Job Area' }
            ]}
            width={width}
            maxHeight={500}
            style={{ backgroundColor: 'white' }}
          />
        )}
      </AutoSizer>
    );
  })
  .add('headers', () => {
    const data = createPersonData(100);
    return (
      <AutoSizer>
        {({ width, height }) => (
          <MuiTable
            data={data}
            columns={[
              {
                name: 'fullName',
                header: 'Name',
                width: 180,
                cell: d => `${d.firstName} ${d.lastName}`,
                cellProps: { style: { paddingRight: 0 } }
              },
              { name: 'jobTitle', header: 'Job Title' },
              { name: 'jobArea', header: 'Job Area' }
            ]}
            width={width}
            maxHeight={500}
            includeHeaders={true}
            style={{ backgroundColor: 'white' }}
          />
        )}
      </AutoSizer>
    );
  })
  .add('fixed headers', () => {
    const data = createPersonData(100);
    return (
      <AutoSizer>
        {({ width, height }) => (
          <MuiTable
            data={data}
            columns={[
              {
                name: 'fullName',
                header: 'Name',
                width: 180,
                cell: d => `${d.firstName} ${d.lastName}`,
                cellProps: { style: { paddingRight: 0 } }
              },
              { name: 'jobTitle', header: 'Job Title' },
              { name: 'jobArea', header: 'Job Area' }
            ]}
            width={width}
            maxHeight={500}
            includeHeaders={true}
            fixedRowCount={1}
            style={{ backgroundColor: 'white' }}
          />
        )}
      </AutoSizer>
    );
  })
  .add('pagination', () => {
    const data = createPersonData(15);
    return (
      <AutoSizer>
        {({ width, height }) => (
          <PaginatedTable
            data={data}
            columns={[
              {
                name: 'fullName',
                header: 'Name',
                width: 180,
                cell: d => `${d.firstName} ${d.lastName}`,
                cellProps: { style: { paddingRight: 0 } }
              },
              { name: 'jobTitle', header: 'Job Title' },
              { name: 'jobArea', header: 'Job Area' }
            ]}
            width={width}
            maxHeight={400}
            includeHeaders={true}
            style={{ backgroundColor: 'white' }}
          />
        )}
      </AutoSizer>
    );
  })
  .add('pagination (maxHeight > calculatedHeight)', () => {
    const data = createPersonData(15);
    return (
      <AutoSizer>
        {({ width, height }) => (
          <PaginatedTable
            data={data}
            columns={[
              {
                name: 'fullName',
                header: 'Name',
                width: 180,
                cell: d => `${d.firstName} ${d.lastName}`,
                cellProps: { style: { paddingRight: 0 } }
              },
              { name: 'jobTitle', header: 'Job Title' },
              { name: 'jobArea', header: 'Job Area' }
            ]}
            width={width}
            maxHeight={800}
            includeHeaders={true}
            style={{ backgroundColor: 'white' }}
          />
        )}
      </AutoSizer>
    );
  })
  .add('pagination (fitHeightToRows)', () => {
    const data = createPersonData(15);
    return (
      <AutoSizer>
        {({ width, height }) => (
          <PaginatedTable
            data={data}
            columns={[
              {
                name: 'fullName',
                header: 'Name',
                width: 180,
                cell: d => `${d.firstName} ${d.lastName}`,
                cellProps: { style: { paddingRight: 0 } }
              },
              { name: 'jobTitle', header: 'Job Title' },
              { name: 'jobArea', header: 'Job Area' }
            ]}
            width={width}
            fitHeightToRows={true}
            includeHeaders={true}
            style={{ backgroundColor: 'white' }}
          />
        )}
      </AutoSizer>
    );
  });

storiesOf('Performance', module)
  .add('1000 rows (no virtualizaiton)', () => {
    const data = createPersonData(1000);
    return (
      <AutoSizer>
        {({ width }) => (
          <MuiTable
            data={data}
            columns={[{ name: 'firstName' }, { name: 'lastName' }]}
            width={width}
            style={{ backgroundColor: 'white' }}
          />
        )}
      </AutoSizer>
    );
  })

  .add('1000 rows (fixed height)', () => {
    const data = createPersonData(1000);
    return (
      <AutoSizer>
        {({ width, height }) => (
          <MuiTable
            data={data}
            columns={[{ name: 'firstName' }, { name: 'lastName' }]}
            width={width}
            height={400}
            style={{ backgroundColor: 'white' }}
          />
        )}
      </AutoSizer>
    );
  })

  .add('1000 rows (viewport height)', () => {
    const data = createPersonData(1000);
    return (
      <div style={{ height: 'calc(100vh)' }}>
        <AutoSizer>
          {({ width, height }) => (
            <MuiTable
              data={data}
              columns={[{ name: 'firstName' }, { name: 'lastName' }]}
              width={width}
              height={height}
              style={{ backgroundColor: 'white' }}
            />
          )}
        </AutoSizer>
      </div>
    );
  });

storiesOf('Examples', module)
  .add('dessert', () => {
    const data = createDessertData();
    return (
      <div style={{ height: 'calc(100vh)' }}>
        <AutoSizer>
          {({ width, height }) => (
            <PaginatedTable
              data={data}
              columns={[
                {
                  name: 'name',
                  header: 'Dessert (100g serving)',
                  width: 200,
                  cellProps: { style: { paddingRight: 0 } }
                },
                {
                  name: 'calories',
                  header: 'Calories',
                  cellProps: { numeric: true }
                },
                {
                  name: 'fat',
                  header: 'Fat (g)',
                  cellProps: { numeric: true }
                },
                {
                  name: 'carbs',
                  header: 'Carbs (g)',
                  cellProps: { numeric: true }
                },
                {
                  name: 'protein',
                  header: 'Protein (g)',
                  cellProps: { numeric: true }
                }
              ]}
              width={width}
              // width={800}
              maxHeight={height}
              includeHeaders={true}
              // fixedRowCount={1}
              // fixedColumnCount={1}
              defaultPagination={{ rowsPerPage: 5 }}
              style={{ backgroundColor: 'white' }}
            />
          )}
        </AutoSizer>
      </div>
    );
  })
  .add('all the things', () => {
    const data = createPersonData(1000);
    return (
      <div style={{ height: 'calc(100vh)' }}>
        <AutoSizer>
          {({ width, height }) => (
            <PaginatedTable
              data={data}
              columns={[
                {
                  name: 'fullName',
                  header: 'Name',
                  width: 180,
                  cell: d => `${d.firstName} ${d.lastName}`,
                  cellProps: { style: { paddingRight: 0 } }
                },
                { name: 'jobTitle', header: 'Job Title', width: 400 },
                { name: 'jobArea', header: 'Job Area', width: 400 },
                { name: 'jobType', header: 'Job Type', width: 400 }
              ]}
              width={width}
              maxHeight={height}
              includeHeaders={true}
              fixedRowCount={1}
              fixedColumnCount={1}
              style={{ backgroundColor: 'white' }}
            />
          )}
        </AutoSizer>
      </div>
    );
  });

class PaginatedTable extends Component {
  state = {
    page: 1,
    perPage:
      (this.props.defaultPagination &&
        this.props.defaultPagination.rowsPerPage) ||
      10
  };

  render() {
    const { data, defaultPagination, ...props } = this.props;
    const { page, perPage } = this.state;

    const start = perPage * (page - 1);
    const pageData = data.slice(start, start + perPage);

    return (
      <MuiTable
        data={pageData}
        pagination={{
          count: data.length,
          rowsPerPage: perPage,
          page: page - 1, // material-ui's <TablePagination /> is 0-based
          // rowsPerPageOptions: [5, 10, 25, 100, 1000],
          onChangePage: (e, page) => this.setState({ page: page + 1 }),
          onChangeRowsPerPage: e => this.setState({ perPage: e.target.value })
        }}
        {...props}
      />
    );
  }
}
