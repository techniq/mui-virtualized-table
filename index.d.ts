import { TableCellProps } from "@material-ui/core/TableCell";
import { TablePaginationProps } from "@material-ui/core/TablePagination";
import * as React from "react";

export type CellClickEventHandler<HTMLElement, TRow> = (
  event: React.MouseEvent<HTMLElement>,
  props: IHeaderClickProps<TRow>
) => void;

export interface IHeaderClickProps<TRow> {
  column: IMuiVirtualizedTableColumn<TRow>;
  rowData?: TRow;
  data?: TRow[];
}

export type ICellPropsProducer<TRow> =
  | TableCellProps
  | ((
      column: IMuiVirtualizedTableColumn<TRow>,
      rowData: TRow,
      hoveredColumn?: IMuiVirtualizedTableColumn<TRow>,
      hoveredRowData?: TRow
    ) => TableCellProps);

export interface IMuiVirtualizedTableColumn<TRow = any> {
  /**
   * Callback for rendering associated column cell data. Passes the row data for the associated cell.
   */
  cell?: (rowData: TRow) => React.ReactNode;

  /**
   * Name to display instead of `name`
   */
  header?: React.ReactNode;

  /**
   * Name of header
   */
  name: string;

  /**
   * Callback when header is clicked on (has precedence over `onHeaderClick` on table)
   */
  onHeaderClick?: CellClickEventHandler<HTMLElement, TRow> | boolean;

  /**
   * Width of cell.
   *
   * Can be a `number`, straight pixel width, or percentage string like `40%`
   */
  width?: number | string;

  /**
   * Minimum width of cell.
   *
   * Must be a `number`
   */
  minWidth?: number;


  cellProps?: ICellPropsProducer<TRow>;
}

export interface IMuiVirtualizedTableProps<TRow> {
  cellProps?: ICellPropsProducer<TRow>;

  /**
   * Styling hooks which can be overridden
   */
  classes?: {
    DragHandleActive?: string;
    DragHandleIcon?: string;
    cell?: string;
    cellContents?: string;
    cellHeader?: string;
    cellHovered?: string;
    cellInLastColumn?: string;
    cellInLastRow?: string;
    cellSelected?: string;
    dragHandle?: string;
    footer?: string;
    table?: string;
  };

  /**
   * Static column widths if `number`, calculated based on columns definitions if not specified,
   * or can pass in a function to peform own calcuation based on data
   */
  columnWidth?:
    | number
    | ((column: {
        index: number;
        columns: ReadonlyArray<IMuiVirtualizedTableColumn<TRow>>;
        width: number;
      }) => number);

  /**
   * Defines the columns in the table
   */
  columns: ReadonlyArray<IMuiVirtualizedTableColumn<TRow>>;

  /**
   * Data to render using defined `columns`
   */
  data: ReadonlyArray<TRow>;

  /**
   * Always fit the content height to row data.
   * Only useful when using pagination and you want to reduce the height on non-full pages (will move paginator on different length results).
   */
  fitHeightToRows?: boolean;

  /**
   * Number of columns to remain fixed at the left of the viewport (freeze columns).
   * Based on `columns` definition order.
   */
  fixedColumnCount?: number;

  /**
   * Number of rows to remain fixed at the top of the viewport (freeze rows).
   * Based on `columns` definition order.
   */
  fixedRowCount?: number;

  /**
   * Visible height of table.
   * Will scroll vertically if sum of column heights are great than defined height.
   */
  height?: number;

  /**
   * Add header row to top of data.
   * Useful to also set `fixedRowCount` to `1`.
   */
  includeHeaders?: boolean;

  /**
   * Determines if `classes.cellHovered` should be applied
   */
  isCellHovered?: (
    column: IMuiVirtualizedTableColumn<TRow>,
    rowData: TRow,
    hoveredColumn?: IMuiVirtualizedTableColumn<TRow>,
    hoveredRowData?: TRow
  ) => boolean;

  /**
   * Determines if `classes.cellSelected` should be applied
   */
  isCellSelected?: (
    column: IMuiVirtualizedTableColumn<TRow>,
    rowData: TRow
  ) => boolean;

  /**
   * Determines if `classes.cellDisabled` should be applied
   */
  isCellDisabled?: (
    column: IMuiVirtualizedTableColumn<TRow>,
    rowData: TRow
  ) => boolean;

  /**
   * Maximum height of table. Useful when using calculated
   */
  maxHeight?: number;

  /**
   * Called with column definition and row data when non-header cell is clicked on
   */
  onCellClick?: CellClickEventHandler<HTMLElement, TRow>;

  /**
   * Called with column definition and row data when non-header cell is double clicked on
   */
  onCellDoubleClick?: CellClickEventHandler<HTMLElement, TRow>;

  /**
   * Called with column definition and row data when non-header cell is right clicked on
   */
  onCellContextMenu?: CellClickEventHandler<HTMLElement, TRow>;

  /**
   * Called with column definition of header clicked on.
   * Useful to set sort data and set `orderBy` and `orderDirection`.
   */
  onHeaderClick?: CellClickEventHandler<HTMLElement, TRow>;

  /**
   * If defined, will show column's header with matching name using `TableSortLabel`
   */
  orderBy?: string;

  /**
   * The order of the sort direction
   */
  orderDirection?: "asc" | "desc";

  /**
   * If defined, will add pagination to bottom of table and pass props to Material-UI's `<TablePagination>` component.
   */
  pagination?: TablePaginationProps;

  /**
   * Enable column resizing handles
   */
  resizable?: boolean;

  /**
   * Height of rows
   */
  rowHeight?: number;

  /**
   * Additional CSS to be applied to the underlying Material UI `<Table>` component
   */
  style?: React.CSSProperties;

  /**
   * Visible width of table.
   * Will scroll horizontally if sum of column widths are greater than defined width.
   *
   * Consider using [`<AutoSizer>` component from `react-virtualized`](https://github.com/bvaughn/react-virtualized/blob/master/docs/usingAutoSizer.md) for dynamic values.
   */
  width: number;
}

export default class MuiVirtualizedTable<TRow> extends React.Component<
  IMuiVirtualizedTableProps<TRow>
> {}
