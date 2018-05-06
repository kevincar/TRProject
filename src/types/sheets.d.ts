// Google Sheets API V4

declare namespace Sheets {

    interface Spreadsheet {
        spreadsheetId: string,
        properties: SpreadsheetProperties,
        sheets: Sheet[],
        namedRanges: NamedRange[],
        spreadsheetUrl: string,
        developerMetadata: DeveloperMetadata
    }

    interface SpreadsheetProperties {
        title: string,
        locale: string,
        autoRecalc: RecalculationInterval,
        timeZone: string,
        defaultFormat: CellFormat,
        iterativeCalculationSettings: IterativeCalculationSettings
    }

    enum RecalculationInterval {
        RECALCULATION_INTERVAL_UNSPECIFIED,
        ON_CHANGE,
        MINUTE,
        HOUR
    }

    interface CellFormat {
        numberFormat: NumberFormat,
        backgroundColor: Color,
        borders: Borders,
        padding: Padding,
        horizontalAlignment: HorizontalAlign,
        verticalAlignment: VerticalAlign,
        wrapStrategy: WrapStrategy,
        textDirection: TextDirection,
        textFormat: TextFormat,
        hyperlinkDisplayType: HyperlinkDisplayType,
        textRotation: TextRotation
    }

    interface NumberFormat {
        type: NumberFormatType,
        pattern: string
    }

    enum NumberFormatType {
        NUMBER_FORMAT_TYPE_UNSPECIFIED,
        TEXT,
        NUMBER,
        PERCENT,
        CURRENCY,
        DATE,
        TIME,
        DATE_TIME,
        SCIENTIFI,
    }

    interface Color {
        red: number,
        green: number,
        blue: number,
        alpha: number
    }

    interface Borders {
        top: Border,
        bottom: Border,
        left: Border,
        right: Border
    }

    interface Border {
        "style": Style,
        "width": number,
        "color": Color
    }

    enum Style {
        STYLE_UNSPECIFIED,	        //  The style is not specified. Do not use this.
        DOTTED,                     //	The border is dotted.
        DASHED,                     //	The border is dashed.
        SOLID,                      //	The border is a thin solid line.
        SOLID_MEDIUM,               //	The border is a medium solid line.
        SOLID_THICK,                //	The border is a thick solid line.
        NONE,                       //	No border. Used only when updating a border in order to erase it.
        DOUBLE                      //	The border is two solid lines.
    }

    interface Padding {
        top: number,
        right: number,
        bottom: number,
        left: number
    }

    enum HorizontalAlign {
        HORIZONTAL_ALIGN_UNSPECIFIED,
        LEFT,
        CENTER,
        RIGH,
    }

    enum VerticalAlign {
        VERTICAL_ALIGN_UNSPECIFIED,
        TOP,
        MIDDLE,
        BOTTO
    }

    enum WrapStrategy {
        WRAP_STRATEGY_UNSPECIFIED,
        OVERFLOW_CELL,
        LEGACY_WRAP,
        CLIP,
        WRAP
    }

    enum TextDirection {
        TEXT_DIRECTION_UNSPECIFIED,
        LEFT_TO_RIGHT,
        RIGHT_TO_LEFT
    }

    interface TextFormat {
        foregroundColor: Color,
        fontFamily: string,
        fontSize: number,
        bold: boolean,
        italic: boolean,
        strikethrough: boolean,
        underline: boolean
    }

    enum HyperlinkDisplayType {
        HYPERLINK_DISPLAY_TYPE_UNSPECIFIED,
        LINKED,
        PLAIN_TEXT
    }

    interface TextRotation {
        angle?: number,
        vertical?: boolean
    }

    interface IterativeCalculationSettings {
        maxIterations: number,
        convergenceThreshold: number
    }

    interface Sheet {
        properties: SheetProperties,
        data: GridData[],
        merges: GridRange[],
        conditionalFormats: ConditionalFormatRule[],
        filterViews: FilterView[],
        protectedRanges: ProtectedRange[],
        basicFilter: BasicFilter[],
        charts: EmbeddedChart[],
        bandedRanges: BandedRange[],
        developerMetadata: DeveloperMetadata[]
    }

    interface SheetProperties {
        sheetId: number,
        title: string,
        index: number,
        sheetType: SheetType,
        gridProperties: GridProperties,
        hidden: boolean,
        tabColor: Color,
        rightToLeft: boolean
    }

    enum SheetType {
        SHEET_TYPE_UNSPECIFIED,
        GRID,
        OBJECT
    }

    interface GridProperties {
        rowCount: number,
        columnCount: number,
        frozenRowCount: number,
        frozenColumnCount: number,
        hideGridlines: boolean
    }

    interface GridData {
        startRow: number,
        startColumn: number,
        rowData: RowData[],
        rowMetadata: DimensionProperties[],
        columnMetadata: DimensionProperties[]
    }

    interface RowData {
        values: CellData[]
    }

    interface CellData {
        userEnteredValue: ExtendedValue,
        effectiveValue: ExtendedValue,
        formattedValue: string,
        userEnteredFormat: CellFormat,
        effectiveFormat: CellFormat,
        hyperlink: string,
        note: string,
        textFormatRuns: TextFormatRun[],
        dataValidation: DataValidationRule,
        pivotTable: PivotTable
    }

    interface ExtendedValue {
        numberValue?: number,
        stringValue?: string,
        boolValue?: boolean,
        formulaValue?: string,
        errorValue?: ErrorValue
    }

    interface ErrorValue {
        type: ErrorType,
        message: string
    }

    enum ErrorType {
        ERROR_TYPE_UNSPECIFIED,
        ERROR,
        NULL_VALUE,
        DIVIDE_BY_ZERO,
        VALUE,
        REF,
        NAME,
        NUM,
        N_A,
        LOADING
    }

    interface TextFormatRun {
        startIndex: number,
        format: TextFormat
    }

    interface DataValidationRule {
        condition: BooleanCondition,
        inputMessage: string,
        strict: boolean,
        showCustomUi: boolean
    }

    interface BooleanCondition {
        type: ConditionType,
        values: ConditionValue[]
    }

    enum ConditionType {
        CONDITION_TYPE_UNSPECIFIED,
        NUMBER_GREATER,
        NUMBER_GREATER_THAN_EQ,
        NUMBER_LESS,
        NUMBER_LESS_THAN_EQ,
        NUMBER_EQ,
        NUMBER_NOT_EQ,
        NUMBER_BETWEEN,
        NUMBER_NOT_BETWEEN,
        TEXT_CONTAINS,
        TEXT_NOT_CONTAINS,
        TEXT_STARTS_WITH,
        TEXT_ENDS_WITH,
        TEXT_EQ,
        TEXT_IS_EMAIL,
        TEXT_IS_URL,
        DATE_EQ,
        DATE_BEFORE,
        DATE_AFTER,
        DATE_ON_OR_BEFORE,
        DATE_ON_OR_AFTER,
        DATE_BETWEEN,
        DATE_NOT_BETWEEN,
        DATE_IS_VALID,
        ONE_OF_RANGE,
        ONE_OF_LIST,
        BLANK,
        NOT_BLANK,
        CUSTOM_FORMULA
    }

    interface ConditionValue {
        relativeDate: RelativeDate,
        userEnteredValue: string
    }

    enum RelativeDate {
        RELATIVE_DATE_UNSPECIFIED,
        PAST_YEAR,
        PAST_MONTH,
        PAST_WEEK,
        YESTERDAY,
        TODAY,
        TOMORROW
    }

    interface PivotTable {
        source: GridRange,
        rows: PivotGroup[],
        columns: PivotGroup[],
        criteria: {
            [key: number]: PivotFilterCriteria
        },
        values: PivotValue[],
        valueLayout: PivotValueLayout
    }

    interface GridRange {
        sheetId: number,
        startRowIndex: number,
        endRowIndex: number,
        startColumnIndex: number,
        endColumnIndex: number
    }

    interface PivotGroup {
        sourceColumnOffset: number,
        showTotals: boolean,
        valueMetadata: PivotGroupValueMetadata[],
        sortOrder: SortOrder,
        valueBucket: PivotGroupSortValueBucket
    }

    interface PivotGroupValueMetadata {
        value: ExtendedValue,
        collapsed: boolean
    }

    enum SortOrder {
        SORT_ORDER_UNSPECIFIED,
        ASCENDING,
        DESCENDING
    }

    interface PivotGroupSortValueBucket {
        valuesIndex: number,
        buckets: ExtendedValue[]
    }

    interface PivotValue {
        summarizeFunction: PivotValueSummarizeFunction,
        name: string,
        sourceColumnOffset: number,
        formula: string
    }

    enum PivotValueSummarizeFunction {
        PIVOT_STANDARD_VALUE_FUNCTION_UNSPECIFIED,
        SUM,
        COUNTA,
        COUNT,
        COUNTUNIQUE,
        AVERAGE,
        MAX,
        MIN,
        MEDIAN,
        PRODUCT,
        STDEV,
        STDEVP,
        VAR,
        VARP,
        CUSTOM
    }

    enum PivotValueLayout {
        HORIZONTAL,
        VERTICAL
    }

    interface DimensionProperties {
        hiddenByFilter: boolean,
        hiddenByUser: boolean,
        pixelSize: number,
        developerMetadata: DeveloperMetadata[]
    }

    interface ConditionalFormatRule {
        ranges: GridRange[],
        booleanRule: BooleanRule,
        gradientRule: GradientRule
    }

    interface BooleanRule {
        condition: BooleanCondition,
        format: CellFormat
    }

    interface GradientRule {
        minpoint: InterpolationPoint,
        midpoint: InterpolationPoint,
        maxpoint: InterpolationPoint
    }

    interface InterpolationPoint {
        color: Color,
        type: InterpolationPointType,
        value: string
    }

    enum InterpolationPointType {
        INTERPOLATION_POINT_TYPE_UNSPECIFIED,
        MIN,
        MAX,
        NUMBER,
        PERCENT,
        The,
        PERCENTILE
    }

    interface FilterView {
        filterViewId: number,
        title: string,
        range: GridRange,
        namedRangeId: string,
        sortSpecs: SortSpec[],
        criteria: {
            [key: number]: FilterCriteria
        }
    }

    interface SortSpec {
        dimensionIndex: number,
        sortOrder: SortOrder
    }

    interface ProtectedRange {
        protectedRangeId: number,
        range: GridRange,
        namedRangeId: string,
        description: string,
        warningOnly: boolean,
        requestingUserCanEdit: boolean,
        unprotectedRanges: GridRange[],
        editors: Editors
    }

    interface Editors {
        users: string[],
        groups: string[],
        domainUsersCanEdit: boolean
    }

    interface BasicFilter {
        range: GridRange,
        sortSpecs: SortSpec[],
        criteria: {
            [key: number]: FilterCriteria
        }
    }

    interface EmbeddedChart {
        chartId: number,
        spec: ChartSpec,
        position: EmbeddedObjectPosition
    }

    interface ChartSpec {
        title: string,
        altText: string,
        titleTextFormat: TextFormat,
        titleTextPosition: TextPosition,
        subtitle: string,
        subtitleTextFormat: TextFormat,
        subtitleTextPosition: TextPosition,
        fontName: string,
        maximized: boolean,
        backgroundColor: Color,
        hiddenDimensionStrategy: ChartHiddenDimensionStrategy,
        basicChart: BasicChartSpec,
        pieChart: PieChartSpec,
        bubbleChart: BubbleChartSpec,
        candlestickChart: CandlestickChartSpec,
        orgChart: OrgChartSpec,
        histogramChart: HistogramChartSpec
    }

    interface TextPosition {
        horizontalAlignment: HorizontalAlign
    }

    interface BasicChartSpec {
        chartType: BasicChartType,
        legendPosition: BasicChartLegendPosition,
        axis: BasicChartAxis[],
        domains: BasicChartDomain[],
        series: BasicChartSeries[],
        headerCount: number,
        threeDimensional: boolean,
        interpolateNulls: boolean,
        stackedType: BasicChartStackedType,
        lineSmoothing: boolean,
        compareMode: BasicChartCompareMode
    }

    enum BasicChartType {
        BASIC_CHART_TYPE_UNSPECIFIED,
        BAR,
        LINE,
        AREA,
        COLUMN,
        SCATTER,
        COMBO,
        STEPPED_AREA
    }

    enum BasicChartLegendPosition {
        BASIC_CHART_LEGEND_POSITION_UNSPECIFIED,
        BOTTOM_LEGEND,
        LEFT_LEGEND,
        RIGHT_LEGEND,
        TOP_LEGEND,
        NO_LEGEND
    }

    interface BasicChartAxis {
        position: BasicChartAxisPosition,
        title: string,
        format: TextFormat,
        titleTextPosition: TextPosition
    }

    enum BasicChartAxisPosition {
        BASIC_CHART_AXIS_POSITION_UNSPECIFIED,
        BOTTOM_AXIS,
        LEFT_AXIS,
        RIGHT_AXIS
    }

    interface BasicChartDomain {
        domain: ChartData,
        reversed: boolean
    }

    interface ChartData {
        sourceRange: ChartSourceRange
    }

	interface ChartSourceRange {
		sources: GridRange[]
	}

	interface BasicChartSeries {
		series: ChartData,
		targetAxis: BasicChartAxisPosition,
		type: BasicChartType
	}

	enum BasicChartStackedType {
		BASIC_CHART_TYPE_UNSPECIFIED,
		NOT_STACKED,
		STACKED,
		PERCENT_STACKED
	}

	enum BasicChartCompareMode {
		BASIC_CHART_COMPARE_MODE_UNSPECIFIED,
		DATUM,
		CATEGORY
	}

	interface PieChartSpec {
		legendPosition: PieChartLegendPosition,
		domain: ChartData,
		series: ChartData,
		threeDimensional: boolean,
		pieHole: number
	}

	enum PieChartLegendPosition {
		PIE_CHART_LEGEND_POSITION_UNSPECIFIED,
		BOTTOM_LEGEND,
		LEFT_LEGEND,
		RIGHT_LEGEND,
		TOP_LEGEND,
		NO_LEGEND,
		LABELED_LEGEND
	}

	interface BubbleChartSpec {
		legendPosition: BubbleChartLegendPosition,
		bubbleLables: ChartData,
		domain: ChartData,
		series: ChartData,
		groupIds: ChartData,
		bubbleSizes: ChartData,
		bubbleOpacity: number,
		bubbleBorderColor: Color,
		bubbleMaxRadiusSize: number,
		bubbleMinRadiusSize: number,
		bubbleTextStyle: TextFormat
	}

	enum BubbleChartLegendPosition {
		BUBBLE_CHART_LEGEND_POSITION_UNSPECIFIED,
		BOTTOM_LEGEND,
		LEFT_LEGEND,
		RIGHT_LEGEND,
		TOP_LEGEND,
		NO_LEGEND,
		INSIDE_LEGEND
	}

	interface CandlestickChartSpec {
		domain: CandlestickDomain,
		data: CandlestickData[]
	}

	interface CandlestickDomain {
		data: ChartData,
		reversed: boolean
	}

	interface CandlestickData {
		lowSeries: CandlestickSeries,
		openSeries: CandlestickSeries,
		closeSeries: CandlestickSeries,
		highSeries: CandlestickSeries
	}

	interface CandlestickSeries {
		data: ChartData
	}

	interface OrgChartSpec {
		nodeSize: OrgChartNodeSize,
		nodeColor: Color,
		selectedNodeColor: Color,
		labels: ChartData,
		parentLables: ChartData,
		tooltips: ChartData
	}

	enum OrgChartNodeSize {
		ORG_CHART_LABEL_SIZE_UNSPECIFIED,
		SMALL,
		MEDIUM,
		LARGE
	}

	interface HistogramChartSpec {
		series: HistogramSeries[],
		legendPosition: HistogramChartLegendPosition,
		showItemDividers: boolean,
		bucketSize: number,
		outlierPercentile: number
	}

	interface HistogramSeries {
		barColor: Color,
		data: ChartData
	}

	enum HistogramChartLegendPosition {
		HISTOGRAM_CHART_LEGEND_POSITION_UNSPECIFIED,
		BOTTOM_LEGEND,
		LEFT_LEGEND,
		RIGHT_LEGEND,
		TOP_LEGEND,
		NO_LEGEND,
		INSIDE_LEGEND
	}

	enum ChartHiddenDimensionStrategy {
		CHART_HIDDEN_DIMENSION_STRATEGY_UNSPECIFIED,
		SKIP_HIDDEN_ROWS_AND_COLUMNS,
		SKIP_HIDDEN_ROWS,
		SKIP_HIDDEN_COLUMNS,
		SHOW_ALL
	}

	interface EmbeddedObjectPosition {
		sheetId: number,
		overlayPosition: OverlayPosition,
		newSheet: boolean
	}

	interface OverlayPosition {
		anchorCell: GridCoordinate,
		offsetXPixels: number,
		offsetYPixels: number,
		widthPixels: number,
		heightPixels: number
	}

	interface GridCoordinate {
		sheetId: number,
		rowIndex: number,
		columnIndex: number
	}

	interface BandedRange {
		bandedRangeId: number,
		range: GridRange,
		rowProperties: BandingProperties,
		columnProperties: BandingProperties
	}

	interface BandingProperties {
		headerColor: Color,
		firstBandColor: Color,
		secondBandColor: Color,
		footerColor: Color
	}

	interface NamedRange {
		namedRangeId: string,
		name: string,
		range: GridRange
	}

    // Modules

    namespace Spreadsheets {
        function get(spreadsheetId: string): Spreadsheet;
        function get(spreadsheetId: string, optionalArgs: Object): Spreadsheet;

        namespace Values {
            function get(spreadsheetId: string, range: string): ValueRange;
            function get(spreadsheetId: string, range: string, optionalArgs: Object): ValueRange;

            function update(resource: ValueRange, spreadsheetId: string, range: string): UpdateValueResponse;
            function update(resource: ValueRange, spreadsheetId: string, range: string, optionalArgs: Object): UpdateValueResponse;
        }
    }

	// DEVELOPERMETADATA

	interface DeveloperMetadata {
		metadataId: number;
		metadataKey: string;
		metadataValue: string;
		location: DeveloperMetadataLocation;
		visibility: DeveloperMetadataVisibility;
	}

	interface DeveloperMetadataLocation {
		locationType: DeveloperMetadataLocationType,
		spreadsheet: boolean,
		sheetId: number,
		dimensionRange: DimensionRange
	}

	enum DeveloperMetadataLocationType {
		DEVELOPER_METADATA_LOCATION_TYPE_UNSPECIFIED,
		ROW,
		COLUMN,
		SHEET,
		SPREADSHEET
	}

	interface DimensionRange {
		sheetId: number,
		dimension: Dimension,
		startIndex: number,
		endIndex: number
	}

	enum DeveloperMetadataVisibility {
		DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED,
		DOCUMENT,
		PROJECT
	}

	interface sheets {

	}

	interface ValueRange {
		range: string,
		majorDimension: Dimension,
		values: any[]
	}

	interface DataFilter {
		developerMetadataLookup: DeveloperMetadataLookup,
		a1Range: string,
		girdRange: GridRange
	}

	interface DeveloperMetadataLookup {
		locationType: DeveloperMetadataLocationType,
		metadataLocation: DeveloperMetadataLocation,
		locationMatchingStrategy: DeveloperMetadataLocationMatchingStrategy,
		metadataId: number,
		metadataKey: string,
		metadataValue: string,
		visibility: DeveloperMetadataVisibility
	}

	enum DeveloperMetadataLocationMatchingStrategy {
		DEVELOPER_METADATA_LOCATION_MATCHING_STRATEGY_UNSPECIFIED,
		EXACT_LOCATION,
		INTERSECTING_LOCATION
	}

	enum DateTimeRengerOption {
		SERIAL_NUMBER,
		FORMATTED_STRING,

	}

	enum Dimension {
		DIMENSION_UNSPECIFIED,
		ROWS,
		COLUMNS
	}

	interface FilterCriteria {
		hiddenValues: string[],
		condition: BooleanCondition
	}

	interface PivotFilterCriteria {
		visibleValues: string[]
	}

	interface UpdateValueResponse {
		spreadsheetId: string,
		updatedRange: string,
		updatedRows: number,
		updatedColumns: number,
		updatedCells: number,
		updatedData: ValueRange
	}

	enum ValueInputOption {
		INPUT_VALUE_OPTION_UNSPECIFIED,
		RAW,
		USER_ENTERED
	}

	enum ValueRenderedOption {
		FORMATTED_VALUE,
		UNFORMATTED_VALUE,
		FORMULA
	}
}
