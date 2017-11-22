import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MultiGrid } from 'react-virtualized';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  // TableHead,
  TableFooter,
  // TableRow,
  TablePagination,
  TableSortLabel
} from 'material-ui/Table';

const styles = theme => ({
  table: {
    boxSizing: 'border-box',
    border: `1px solid ${theme.palette.text.lightDivider}`,

    '& .topLeftGrid': {
      backgroundColor: theme.palette.background.contentFrame,
      borderBottom: `2px solid ${theme.palette.text.divider}`,
      borderRight: `2px solid ${theme.palette.text.divider}`,
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(12),
    },

    '& .topRightGrid': {
      backgroundColor: theme.palette.background.contentFrame,
      borderBottom: `2px solid ${theme.palette.text.divider}`,
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(12),
    },

    '& .bottomLeftGrid': {
      backgroundColor: theme.palette.background.contentFrame,
      borderRight: `2px solid ${theme.palette.text.divider}`,
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(13),
    },

    '& .bottomRightGrid': {
      color: theme.palette.text.primary,
      fontSize: theme.typography.pxToRem(13),
    }
  },
  cell: {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    // borderRight: `1px solid ${theme.palette.text.lightDivider}`,
  },
  cellHeader: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.secondary,
  },
  cellInLastColumn: {
    paddingRight: theme.spacing.unit * 3
  },
  cellInLastRow: {
    borderBottom: 'none'
  },
  footer: {
    borderTop: `1px solid ${theme.palette.text.divider}`,
  }
});

class MuiTable extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired
  }

  static defaultProps = {
    rowHeight: 48,
    maxHeight: 0,
    includeHeaders: false,
    fixedRowCount: 0,
    fixedColumnCount: 0,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.width !== this.props.width) {
      this.multiGrid.recomputeGridSize();
    }
  }

  cellRenderer = ({columnIndex, rowIndex, key, style}) => {
    const { data, columns, includeHeaders, classes, orderBy, orderDirection, onHeaderClick } = this.props;
    const column = columns[columnIndex];
    const { style: cellStyle, ...cellProps} = column.cellProps || {};

    let contents;
    const isHeader = includeHeaders && rowIndex === 0;

    if (isHeader) {
      contents = column.header || column.name;
    } else {
      const headerOffset = includeHeaders ? 1 : 0;
      const rowData = data[rowIndex - headerOffset];
      contents = column.cell ? column.cell(rowData) : rowData[column.name]
    }

    const className = classNames(classes.cell, {
      [classes.cellHeader]: isHeader,
      [classes.cellInLastColumn]: columnIndex === columns.length - 1,
      [classes.cellInLastRow]: rowIndex === data.length
    })

    return (
      <TableCell
        component="div"
        className={className}
        key={key}
        style={{ ...style, ...cellStyle }}
        {...cellProps}
      >
        { isHeader ? (
          <TableSortLabel
            active={orderBy && orderBy === column.name && rowIndex === 0}
            direction={orderDirection}
            onClick={() => onHeaderClick && onHeaderClick(column)}
          >
            {contents}
          </TableSortLabel>
        ) : (
          contents
        )}
      </TableCell>
    )
  }

  columnWidth = (index, columns, tableWidth) => {
    const column = columns[index];
    if (column.width) {
      return column.width;
    } else {
      // TODO: Support column.width as percentage (0.5 or '50%'?) for variable width columns
      const totalFixedWidth = columns.reduce((result, item) => result + (item.width || 0), 0);
      const variableWidthColumns = columns.filter(c => !c.width);
      const totalMinWidth = columns.reduce((result, item) => result + (item.minWidth || 0), 0);
      const remainingWidth = (tableWidth - totalFixedWidth - totalMinWidth);
      const minWidth = column.minWidth || 0;

      return Math.max(minWidth + remainingWidth / variableWidthColumns.length, minWidth);
    }
  }

  render() {
    const {
      data,
      columns,
      width,
      height,
      maxHeight,
      pagination,
      fixedRowCount,
      fixedColumnCount,
      rowHeight,
      columnWidth,
      includeHeaders,
      classes,
      orderBy,
      orderDirection,
      onHeaderClick,
      ...props
    } = this.props;

    let calculatedHeight = 300; // TODO: Arbitrary default height.  Maybe not needed if we just use '0' when no data
    if (height) {
      calculatedHeight = height; // fixed height
    } else if (pagination && pagination.rowsPerPage) {
      const rowCount = pagination.rowsPerPage + (fixedRowCount ? fixedRowCount : includeHeaders ? 1 : 0)
      calculatedHeight = rowCount * rowHeight;
    } else if (Array.isArray(data)) {
      const rowCount = data.length + (fixedRowCount ? fixedRowCount : includeHeaders ? 1 : 0)
      calculatedHeight = rowCount * rowHeight;
    }
    if (maxHeight) {
      calculatedHeight = Math.min(calculatedHeight, maxHeight);
    }

    return (
      <Table component="div" style={{ width }} className={classes.table} {...props}>
        <MultiGrid
          cellRenderer={this.cellRenderer}
          ref={el => this.multiGrid = el}

          width={width}
          columnWidth={columnWidth || (({ index }) => this.columnWidth(index, columns, width))}
          columnCount={Array.isArray(columns) ? columns.length : 0}
          fixedColumnCount={fixedColumnCount}
          enableFixedColumnScroll={fixedColumnCount > 0}

          height={calculatedHeight}
          rowHeight={rowHeight}
          rowCount={Array.isArray(data) ? data.length + (includeHeaders ? 1 : 0) : 0}
          fixedRowCount={fixedRowCount}
          enableFixedRowScroll={fixedRowCount > 0}

          classNameTopLeftGrid={'topLeftGrid'}
          classNameTopRightGrid={'topRightGrid'}
          classNameBottomLeftGrid={'bottomLeftGrid'}
          classNameBottomRightGrid={'bottomRightGrid'}
        />

        { pagination && (
          <TableFooter component="div" className={classes.footer}>
            <TablePagination component="div" {...pagination} />
          </TableFooter>
        )}
      </Table>
    )
  }
}

export default withStyles(styles)(MuiTable);