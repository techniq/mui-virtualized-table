## mui-table
Combination of [Material UI](http://www.material-ui.com) visual components with react-virtualized for improved performance and features with a simple API. 

For examples of `<MuiTable>` in action, see [demo](https://techniq.github.io/mui-table/) or view the [source](https://github.com/techniq/mui-table/tree/master/stories)

### Features
- Uses windowing for performance (via [react-virtualized](https://github.com/bvaughn/react-virtualized))
- Freeze rows and/or columns
- Fixed or variable (%) column widths

### Props
Property | Type | Required | Default | Description
-------- | ---- | -------- | ------- | -----------
`data` | Array | ✓ |  | Data to render using defined `columns`
`columns` | Array | ✓ |  | Column definitions.  `header`, `row`, ...
`width` | Number | ✓ |  | Visible width of table.  Will scroll horizontally if sum of column widths are greater than defined width
`columnWidth` | Number or Function | | | Static column widths if number, calulated based on `columns` definitons if not specificed, or can pass in a function to peform own calcuation based on data
`height` | Number | | calculted from `data.length` or `pagination.rowsPerPage` if defined | Visible height of table.  Will scroll vertically if sum of column heights are great than defined height
`maxHeight` | Number | | 0 | Maximum height of table.  Useful when using calculated 
`rowHeight` | Number | | 48 | Height of rows
`pagination` | Object | | | 
`fixedRowCount` | Number | | 0 | Number of rows to remain fixed at the top of the viewport (freeze rows).  Based on `columns` definition order
`fixedColumnCount` | Number | | 0 | Number of columns to remain fixed at the left of the viewport (freeze columns).  Based on `columns` definition order
`includeHeaders` | Boolean | | false | Add header row to top of data.  Useful to also set `fixedRowCount` to `1`
`cell`
`cellProps`
