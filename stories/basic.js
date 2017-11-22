import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { ParentSize } from '@vx/responsive';

import MuiTable from '../src';
import { createPersonData, createDessertData } from './data'

storiesOf('Basic', module)
  .add('default (empty)', () => <MuiTable width={500} />)

  .add('simple', () => {
    const data = createPersonData(5);
    return ( 
      <MuiTable
        data={data}
        columns={[
          { name: 'firstName' },
          { name: 'lastName' }
        ]}
        width={500}
      />
    )
  })

  .add('responsive', () => {
    const data = createPersonData(5);
    return (
      <ParentSize>
        {({ width, height }) => (
          <MuiTable
            data={data}
            columns={[
              { name: 'firstName' },
              { name: 'lastName' }
            ]}
            width={width}
          />
        )}
      </ParentSize>
    )
  })
  .add('composite cells', () => {
    const data = createPersonData(1000);
    return (
      <div style={{ height: 'calc(100vh - 16px - 50px - 8px)' }}>
        <ParentSize>
          {({ width, height }) => (
            <MuiTable
              data={data}
              columns={[
                { name: 'fullName', header: 'Name', width: 180, cell: d => `${d.firstName} ${d.lastName}`, cellProps: { style: { paddingRight: 0 } }},
                { name: 'jobTitle', header: 'Job Title' },
                { name: 'jobArea', header: 'Job Area' },
              ]}
              width={width}
              maxHeight={height}
              includeHeaders={true}
            />
          )}
        </ParentSize>
      </div>
    )
  })
  .add('include headers', () => {
    const data = createPersonData(5);
    return ( 
      <MuiTable
        data={data}
        columns={[
          { name: 'firstName' },
          { name: 'lastName' }
        ]}
        includeHeaders={true}
        width={500}
      />
    )
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
      />
    )
  })

  .add('fixed/freeze row(s)', () => {
    const data = createPersonData(1000);
    return (
      <div style={{ height: 'calc(100vh - 16px - 50px - 8px)' }}>
        <ParentSize>
          {({ width, height }) => (
            <MuiTable
              data={data}
              columns={[
                { name: 'fullName', header: 'Name', width: 180, cell: d => `${d.firstName} ${d.lastName}`, cellProps: { style: { paddingRight: 0 } }},
                { name: 'jobTitle', header: 'Job Title' },
                { name: 'jobArea', header: 'Job Area' },
              ]}
              width={width}
              maxHeight={height}
              includeHeaders={true}
              fixedRowCount={1}
            />
          )}
        </ParentSize>
      </div>
    )
  })
  .add('fixed/freeze column(s)', () => {
    const data = createPersonData(1000);
    return (
      <div style={{ height: 'calc(100vh - 16px - 50px - 8px)' }}>
        <ParentSize>
          {({ width, height }) => (
            <MuiTable
              data={data}
              columns={[
                { name: 'fullName', header: 'Name', width: 180, cell: d => `${d.firstName} ${d.lastName}`, cellProps: { style: { paddingRight: 0 } }},
                { name: 'jobTitle', header: 'Job Title', width: 400 },
                { name: 'jobArea', header: 'Job Area', width: 400 },
                { name: 'jobType', header: 'Job Type', width: 400 },
              ]}
              width={width}
              maxHeight={height}
              includeHeaders={true}
              fixedColumnCount={1}
            />
          )}
        </ParentSize>
      </div>
    )
  })
  .add('fixed/freeze both', () => {
    const data = createPersonData(1000);
    return (
      <div style={{ height: 'calc(100vh - 16px - 50px - 8px)' }}>
        <ParentSize>
          {({ width, height }) => (
            <MuiTable
              data={data}
              columns={[
                { name: 'fullName', header: 'Name', width: 180, cell: d => `${d.firstName} ${d.lastName}`, cellProps: { style: { paddingRight: 0 } }},
                { name: 'jobTitle', header: 'Job Title', width: 400 },
                { name: 'jobArea', header: 'Job Area', width: 400 },
                { name: 'jobType', header: 'Job Type', width: 400 },
              ]}
              width={width}
              maxHeight={height}
              includeHeaders={true}
              fixedRowCount={1}
              fixedColumnCount={1}
            />
          )}
        </ParentSize>
      </div>
    )
  })
  .add('row height', () => {
    const data = createDessertData();
    const orderBy = "FullName desc";
    const [orderProp, orderDirection] = orderBy;
    return (
      <MuiTable
        data={data}
        columns={[
          { name: 'name', header: 'Dessert (100g serving)', cellProps: { style: { paddingRight: 0 } }},
          { name: 'calories', header: 'Calories', cellProps: { numeric: true } },
          { name: 'fat', header: 'Fat (g)', cellProps: { numeric: true }},
          { name: 'carbs', header: 'Carbs (g)', cellProps: { numeric: true } },
          { name: 'protein', header: 'Protein (g)', cellProps: { numeric: true } },
        ]}
        includeHeaders={true}
        width={900}
        rowHeight={24}
      />
    )
  })

storiesOf('Performance', module)
  .add('1000 rows (no virtualizaiton)', () => {
    const data = createPersonData(1000);
    return (
      <ParentSize>
        {({ width }) => (
          <MuiTable
            data={data}
            columns={[
              { name: 'firstName' },
              { name: 'lastName' }
            ]}
            width={width}
          />
        )}
      </ParentSize>
    )
  })

  .add('1000 rows (fixed height)', () => {
    const data = createPersonData(1000);
    return (
      <ParentSize>
        {({ width, height }) => (
          <MuiTable
            data={data}
            columns={[
              { name: 'firstName' },
              { name: 'lastName' }
            ]}
            width={width}
            height={400}
          />
        )}
      </ParentSize>
    )
  })

  .add('1000 rows (viewport height)', () => {
    const data = createPersonData(1000);
    return (
      <div style={{ height: 'calc(100vh - 16px)' }}>
      <ParentSize>
        {({ width, height }) => (
          <MuiTable
            data={data}
            columns={[
              { name: 'firstName' },
              { name: 'lastName' }
            ]}
            width={width}
            height={height}
          />
        )}
      </ParentSize>
      </div>
    )
  })

storiesOf('Examples', module)
  .add('dessert', () => {
    const data = createDessertData();
    return (
      <div style={{ height: 'calc(100vh - 16px - 50px - 8px)' }}>
        <ParentSize>
          {({ width, height }) => (
            <PaginatedTable
              data={data}
              columns={[
                { name: 'name', header: 'Dessert (100g serving)', width: 200, cellProps: { style: { paddingRight: 0 } } },
                { name: 'calories', header: 'Calories', cellProps: { numeric: true } },
                { name: 'fat', header: 'Fat (g)', cellProps: { numeric: true }},
                { name: 'carbs', header: 'Carbs (g)', cellProps: { numeric: true } },
                { name: 'protein', header: 'Protein (g)', cellProps: { numeric: true } },
              ]}
              width={width}
              // width={800}
              maxHeight={height}
              includeHeaders={true}
              // fixedRowCount={1}
              // fixedColumnCount={1}
              defaultPagination={{ rowsPerPage: 5 }}
            />
          )}
        </ParentSize>
      </div>
    )
  })
  .add('all the things', () => {
    const data = createPersonData(1000);
    return (
      <div style={{ height: 'calc(100vh - 16px - 50px - 8px)' }}>
        <ParentSize>
          {({ width, height }) => (
            <PaginatedTable
              data={data}
              columns={[
                { name: 'fullName', header: 'Name', width: 180, cell: d => `${d.firstName} ${d.lastName}`, cellProps: { style: { paddingRight: 0 } }},
                { name: 'jobTitle', header: 'Job Title', width: 400 },
                { name: 'jobArea', header: 'Job Area', width: 400 },
                { name: 'jobType', header: 'Job Type', width: 400 },
              ]}
              width={width}
              maxHeight={height}
              includeHeaders={true}
              fixedRowCount={1}
              fixedColumnCount={1}
            />
          )}
        </ParentSize>
      </div>
    )
  })

class PaginatedTable extends Component {
  state = {
    page: 1,
    perPage: this.props.defaultPagination && this.props.defaultPagination.rowsPerPage || 10
  }

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
          onChangePage: (e, page) =>
            this.setState({ page: page + 1 }),
          onChangeRowsPerPage: e =>
            this.setState({ perPage: e.target.value }),
        }}
        {...props}
      />
    )
  }
}
