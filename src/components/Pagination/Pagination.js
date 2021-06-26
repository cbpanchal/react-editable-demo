import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import "./style.css";

const styles = (theme) => ({
  arrowIcon: {
    fontSize: "1.10rem",
  },
  arrowRight: {
    position: "relative",
    right: "10px",
  },
  arrowLeft: {
    position: "relative",
    left: "10px",
  },
  fullBorder: {
    border: "1px solid #eee",
  },
  rightBorder: {
    border: "1px solid #eee",
    borderRight: "none",
  },
  leftBorder: {
    border: "1px solid #eee",
    borderLeft: "none",
  },
});

const defaultButton = (props) => <button {...props}>{props.children}</button>;

class Pagination extends React.Component {
  constructor(props) {
    super();

    this.changePage = this.changePage.bind(this);

    this.state = {
      pageNumber: props.page + 1,
    };
  }

  static propTypes = {
    pages: PropTypes.number,
    page: PropTypes.number,
    PageButtonComponent: PropTypes.any,
    onPageChange: PropTypes.func,
    previousText: PropTypes.string,
    nextText: PropTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    this.changePage(nextProps.page + 1);
  }

  changePage(page, shouldNumberUpdate = true) {
    const activePage = this.props.page + 1;

    if (page === activePage) {
      return;
    }
    this.props.onPageChange(page - 1);
  }

  handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  calculateShowingResult(pageSize, page, totalPages, totalData) {
    let showingCount = 0;
    if (pageSize > totalData.length) {
      showingCount = totalData.length;
    } else if (page === totalPages - 1) {
      showingCount = totalData - page * pageSize;
    } else {
      showingCount = pageSize;
    }
    return showingCount;
  }

  render() {
    const {
      PageButtonComponent = defaultButton,
      pageSize,
      onPageSizeChange,
      page,
      pages,
      data,
      classes,
    } = this.props;
    const activePage = this.props.page + 1;
    const totalData = data.length;
    const showingCount = this.calculateShowingResult(
      pageSize,
      page,
      pages,
      totalData
    );
    return (
      <div className="Table__pagination">
        <div className="Table__showingResultWrapper">
          <span className="Table__showingText">
            Showing {showingCount} of{" "}
            <b className="Table_totalText">{totalData}</b> results
          </span>
        </div>
        <div className="Table__prevPageWrapper">
          <div className="Table__prevPage">
            <span className="Table__rowsText">rows per page</span>
            <select
              className="Table__pageSelect"
              value={pageSize}
              onChange={(e) => {
                onPageSizeChange(Number(e.target.value));
              }}
            >
              {[5, 10, 15, 20, 25].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <PageButtonComponent
              className="Table__pageButton"
              onClick={() => {
                if (activePage === 1) return;
                this.changePage(0);
              }}
              disabled={activePage === 1}
            >
              <ArrowBackIos
                className={`${classes.arrowIcon} ${classes.arrowLeft} ${classes.rightBorder}`}
              />
              <ArrowBackIos
                className={`${classes.arrowIcon} ${classes.leftBorder}`}
              />
            </PageButtonComponent>
            <PageButtonComponent
              className="Table__pageButton"
              onClick={() => {
                if (activePage === 1) return;
                this.changePage(activePage - 1);
              }}
              disabled={activePage === 1}
            >
              <ArrowBackIos
                className={`${classes.arrowIcon} ${classes.fullBorder}`}
              />
            </PageButtonComponent>
          </div>
          <div className="Table__visiblePagesWrapper">
            <input
              type="number"
              defaultValue={page + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) : 0;
                console.log("pageNumber", page);
                this.changePage(page, false);
              }}
              onKeyDown={this.handleKeyDown}
              max={this.props.pages}
              min={1}
              className="Table__inputField"
            />
            <span className="Table__ofText">of</span>
            <span>{this.props.pages}</span>
          </div>
          <div className="Table__nextPageWrapper">
            <PageButtonComponent
              className="Table__pageButton"
              onClick={() => {
                if (activePage === this.props.pages) return;
                this.changePage(activePage + 1);
              }}
              disabled={activePage === this.props.pages}
            >
              <ArrowForwardIosIcon
                className={`${classes.arrowIcon} ${classes.fullBorder}`}
              />
            </PageButtonComponent>
            <PageButtonComponent
              className="Table__pageButton"
              onClick={() => {
                if (activePage === this.props.pages) return;
                this.changePage(this.props.pages);
              }}
              disabled={activePage === this.props.pages}
            >
              <ArrowForwardIosIcon
                className={`${classes.arrowIcon} ${classes.rightBorder}`}
              />
              <ArrowForwardIosIcon
                className={`${classes.arrowIcon} ${classes.arrowRight} ${classes.leftBorder}`}
              />
            </PageButtonComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Pagination);
