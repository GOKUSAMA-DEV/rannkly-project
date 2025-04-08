import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/homepage.scss";
import gridIcon from "../assets/image/gridIcon.png";
import threeDotIcon from "../assets/image/threeDotIcon.png";
import filterIcon from "../assets/image/filterIcon.png";
import dragIcon from "../assets/image/dragIcon.png";
import threeBigDotIcon from "../assets/image/threeBigDotIcon.png";
import checkIcon from "../assets/image/checkIcon.png";
import unCheckIcon from "../assets/image/unCheckIcon.png";
import unCheckRadio from "../assets/image/unCheckRadio.png";
import checkRadio from "../assets/image/checkRadio.png";
import searchInputIcon from "../assets/image/searchInputIcon.png";
import greyCrossIcon from "../assets/image/greyCrossIcon.png";
import downloadIcon from "../assets/image/downloadIcon.png";
import fileLogo from "../assets/image/fileLogo.png";
import tickIcon from "../assets/image/tickIcon.png";
import anaIcon from "../assets/image/anaIcon.png";
import OnlineRatingChart from "../OnlineRatingChart";
import ReviewChart from "../ReviewChart";
import SentimentScore from "../SentimentScore";
import NetPromoter from "../NetPromoter";
import Modal from "../components/Modal/Modal";
import Sidebar from "../components/Sidebar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ModalTwo from "../components/Modal/ModalTwo";
import SelectTemp from "../components/SelectTemp";
import NetPromoterTwo from "../NetPromoterTwo";

const Homepage = () => {
  // Static Data Graph

  const optionRef = useRef(null);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const chartRef = useRef(null);
  const respondedRef = useRef(null);
  const sentimentRef = useRef(null);
  const netPromoterRef = useRef(null);
  const ratingReviewRef = useRef(null);
  const [rangeLayer, setRangeLayer] = useState("");
  const uniqueCities = [
    "Gaziabad",
    "Noida",
    "Delhi",
    "Nagpur",
    "Lucknow",
    "Kanpur",
    "Raipur",
    "Kolkata",
  ];
  const dropOptions = [
    {
      label: "PDF",
      value: "PDF",
    },
    {
      label: "CSV",
      value: "CSV",
    },
  ];
  const [selectDropOptions, setSelectDropOptions] = useState("PDF");
  const [selectedCities, setSelectedCities] = useState(uniqueCities);
  const [isSelectAll, setIsSelectAll] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      if (optionRef.current && !optionRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionRef]);
  const [pendingCities, setPendingCities] = useState(uniqueCities);
  const [pendingRange, setPendingRange] = useState("Yearly");
  const [isPopThreeDot, setIsPopThreeDot] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    isOnlineRating: false,
    isResponded: false,
    isSentiment: false,
    isNetPromoter: false,
    isRatingReview: false,
  });
  const [dropdownOpenTwo, setDropdownOpenTwo] = useState({
    isOnlineRating: false,
    isResponded: false,
    isSentiment: false,
    isNetPromoter: false,
    isRatingReview: false,
  });
  const [dropMenuOptions, setDropMenuOptions] = useState({
    isOnlineRating: {
      isBarChart: true,
      isLineChart: false,
      isPieChart: false,
    },
    isResponded: {
      isBarChart: true,
      isLineChart: false,
      isPieChart: false,
    },
    isSentiment: {
      isBarChart: true,
      isLineChart: false,
      isPieChart: false,
    },
    isNetPromoter: {
      isBarChart: true,
      isLineChart: false,
      isPieChart: false,
    },
    isRatingReview: {
      isBarChart: true,
      isLineChart: false,
      isPieChart: false,
    },
  });
  const [popGraphType, setPopGraphType] = useState({
    isBarChart: true,
    isLineChart: false,
    isPieChart: false,
  });
  const [filterType, setFilterType] = useState("monthly");
  const [isGraphType, setIsGraphType] = useState({
    isOnlineRating: false,
    isResponded: false,
    isSentiment: false,
    isNetPromoter: false,
    isRatingReview: false,
  });
  const [isModalGraph, setIsModalGraph] = useState("Yearly");
  const [isOpen, setIsOpen] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  const getGraph = (e) => {
    if (e === "Online Rating Index") {
      return (
        <OnlineRatingChart
          chartRef={chartRef}
          isHeight={350}
          data={data}
          chartType={popGraphType}
        />
      );
    } else if (e === "Responded & Unresponded Reviews") {
      return (
        <ReviewChart
          respondedRef={respondedRef}
          isHeight={350}
          data={data}
          chartType={popGraphType}
        />
      );
    } else if (e === "Sentiment Score") {
      return (
        <SentimentScore
          sentimentRef={sentimentRef}
          isHeight={350}
          data={data}
          chartType={popGraphType}
        />
      );
    } else if (e === "Net Promotor Score") {
      return (
        <NetPromoter
          netPromoterRef={netPromoterRef}
          isHeight={350}
          data={data}
          chartType={popGraphType}
        />
      );
    } else if (e === "Ratings & Reviews") {
      return (
        <NetPromoterTwo
          ratingReviewRef={ratingReviewRef}
          isHeight={350}
          data={data}
          chartType={popGraphType}
        />
      );
    }
  };

  // City Filter
  const pendingCitiesRef = useRef(pendingCities);

  useEffect(() => {
    pendingCitiesRef.current = pendingCities;
  }, [pendingCities]);
  console.log(pendingCities, "pendingCities pendingCities");
  const handleCityChange = (city) => {
    console.log(city, "citycity");
    if (city === "all") {
      setPendingCities(uniqueCities);
    } else {
      setPendingCities((prev) =>
        prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
      );
    }
  };
  // const filteredData = data.filter((d) => selectedCities.includes(d.city));

  const handleApplyFilters = () => {
    setSelectedCities(pendingCities);
    console.log(pendingCities, "pendingCities pendingCities");
    setRangeLayer(pendingRange);

    console.log(originalData, "originalData updated");

    // Apply filtering here
    let filtered = originalData;
    console.log(filtered, "filtered filtered");
    console.log(originalData, " originalData originalData");

    // Step 1: Filter by cities
    if (pendingCities.length > 0) {
      filtered = filtered.filter((item) => pendingCities.includes(item.city));
    }
    console.log(pendingCities, "pendingCities pendingCities");

    filtered = filtered.filter((item) => {
      const itemDate = new Date(item.date);
      const rangeDate = new Date(); // clone fresh

      switch (pendingRange) {
        case "Last 7 Days":
          rangeDate.setDate(rangeDate.getDate() - 7);
          return itemDate >= rangeDate;
        case "Last 30 Days":
          rangeDate.setDate(rangeDate.getDate() - 30);
          return itemDate >= rangeDate;
        case "Last 3 Months":
          rangeDate.setMonth(rangeDate.getMonth() - 3);
          return itemDate >= rangeDate;
        case "Yearly":
          rangeDate.setFullYear(rangeDate.getFullYear() - 1);
          return itemDate >= rangeDate;
        default:
          return true;
      }
    });
    setData(filtered);
    setIsFilter(false);
  };

  const getRefDownalod = (e) => {
    console.log(e, "download type");
    if (e?.isOnlineRating) {
      return chartRef.current;
    } else if (e?.isResponded) {
      return respondedRef.current;
    } else if (e?.isSentiment) {
      return sentimentRef.current;
    }
    else if (e?.isNetPromoter) {
      return netPromoterRef.current;
    }else if (e?.isRatingReview) {
      return ratingReviewRef.current;
    }
    return null;
  };
  const handleDownloadPDF = async () => {
    const refElement = getRefDownalod(dropdownOpenTwo);

    if (!refElement) {
      console.error("No valid chart reference found.");
      return;
    }

    const canvas = await html2canvas(refElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("online_rating_chart.pdf");
  };

  const downloadCSV = () => {
    if (!data || data.length === 0) return;

    const header = Object.keys(data[0]).join(",") + "\n";
    const rows = data
      .map((row) =>
        Object.values(row)
          .map((val) => `"${val}"`) // wrap values in quotes in case they contain commas
          .join(",")
      )
      .join("\n");

    const csvContent = header + rows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "online_rating_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFilteredData = (type) => {
    const currentDate = new Date();
    let filtered = [];

    if (type === "monthly") {
      filtered = originalData;
    } else if (type === "quarterly") {
      const currentQuarter = Math.floor(currentDate.getMonth() / 3);
      filtered = originalData.filter((item) => {
        const itemDate = new Date(item.date);
        const itemQuarter = Math.floor(itemDate.getMonth() / 3);
        return (
          itemQuarter === currentQuarter &&
          itemDate.getFullYear() === currentDate.getFullYear()
        );
      });
    } else if (type === "yearly") {
      filtered = originalData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate.getFullYear() === currentDate.getFullYear();
      });
    }

    setData(filtered); // ✅ update filtered data
    setFilterType(type); // ✅ optional, if you want to keep track of current filter
  };

  useEffect(() => {
    const initialData = [
      {
        city: "Gaziabad",
        code: "430123",
        rating: 95.4,
        date: "2025-04-01",
        responded: 800,
        unresponded: 200,
        month: "Oct 2024",
        Positive: 200,
        Negative: 50,
        Neutral: 80,
        Mixed: 30,
      },
      {
        city: "Noida",
        code: "201302",
        rating: 78.2,
        date: "2025-03-21",
        responded: 850,
        unresponded: 150,
        month: "Oct 2024",
        Positive: 150,
        Negative: 99,
        Neutral: 87,
        Mixed: 109,
      },
      {
        city: "Delhi",
        code: "110034",
        rating: 65.1,
        date: "2025-02-15",
        responded: 800,
        unresponded: 200,
        month: "Oct 2024",
        Positive: 100,
        Negative: 60,
        Neutral: 87,
        Mixed: 40,
      },
      {
        city: "Nagpur",
        code: "129012",
        rating: 91.8,
        date: "2025-01-10",
        responded: 780,
        unresponded: 220,
        month: "Oct 2024",
        Positive: 90,
        Negative: 99,
        Neutral: 87,
        Mixed: 109,
      },
      {
        city: "Lucknow",
        code: "129012",
        rating: 74.3,
        date: "2024-12-20",
        responded: 820,
        unresponded: 180,
        Positive: 200,
        Negative: 70,
        Neutral: 100,
        Mixed: 90,
        month: "Oct 2024",
      },
      {
        city: "Kanpur",
        code: "129012",
        rating: 82.6,
        date: "2024-11-11",
        responded: 900,
        unresponded: 100,
        month: "Oct 2024",
        Positive: 250,
        Negative: 65,
        Neutral: 120,
        Mixed: 85,
      },
      {
        city: "Raipur",
        code: "129012",
        rating: 83.1,
        date: "2024-10-25",
        responded: 400,
        unresponded: 120,
        month: "Oct 2024",
        Positive: 210,
        Negative: 69,
        Neutral: 120,
        Mixed: 85,
      },
      {
        city: "Kolkata",
        code: "129012",
        rating: 70.9,
        date: "2024-09-03",
        responded: 800,
        unresponded: 190,
        month: "Oct 2024",
        Positive: 150,
        Negative: 45,
        Neutral: 100,
        Mixed: 45,
      },
    ];
    setOriginalData(initialData);
    setData(initialData); // default view
  }, []);

  return (
    <>
      <div className="parent-home-container">
        <div className="inner-home-container">
          <div className="sidebar-menu">
            <Sidebar />
          </div>
          <div className="right-menu">
            <Navbar />
            <div className="header-view">
              <div className="bead-first">
                <p className="normal-text">Dashboards / </p>
                <p className="black-text" style={{ marginLeft: "5px" }}>
                  {" "}
                  Default
                </p>
              </div>
              <div className="right-side-menu">
                <div className="monthly-filter-container">
                  <p
                    className={`month-select ${
                      filterType === "monthly" ? "active-filter" : ""
                    }`}
                    onClick={() => {
                      setFilterType("monthly");
                      getFilteredData("monthly");
                    }}
                  >
                    Monthly
                  </p>
                  <p
                    className={`month-select ${
                      filterType === "quarterly" ? "active-filter" : ""
                    }`}
                    onClick={() => {
                      setFilterType("quarterly");
                      getFilteredData("quarterly");
                    }}
                  >
                    Quarterly
                  </p>
                  <p
                    className={`month-select ${
                      filterType === "yearly" ? "active-filter" : ""
                    }`}
                    onClick={() => {
                      setFilterType("yearly");
                      getFilteredData("yearly");
                    }}
                  >
                    Yearly
                  </p>
                </div>

                <div className="widgets-button">
                  <img src={gridIcon} className="image-icon" alt="" />
                  <p className="label-text">Widgets</p>
                </div>
                <div
                  className="widgets-button"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsFilter(true);
                  }}
                >
                  <img src={filterIcon} className="image-icon" alt="" />
                  <p className="label-text">Filter</p>
                </div>
              </div>
            </div>
            <div className="graph-container">
              <div className="first-row-graph">
                <div
                  className={`com-graph-box ${
                    isGraphType.isOnlineRating ? "active-filter" : ""
                  }`}
                >
                  <div className="top-row">
                    <div className="inner-top-first">
                      <img
                        className="check-icon"
                        src={
                          isGraphType.isOnlineRating ? checkIcon : unCheckIcon
                        }
                        onClick={() => {
                          setIsGraphType({
                            isOnlineRating: !isGraphType.isOnlineRating,
                            isResponded: false,
                            isSentiment: false,
                            isNetPromoter: false,
                            isRatingReview: false,
                          });
                        }}
                        alt=""
                      />
                      <p className="title-top">Online&nbsp;Rating&nbsp;Index</p>
                    </div>
                    <div className="inner-top-last">
                      <img
                        src={threeDotIcon}
                        className="inner-top-last"
                        alt=""
                        onClick={() => {
                          setDropdownOpen({
                            isOnlineRating: !dropdownOpen.isOnlineRating,
                            isResponded: false,
                            isSentiment: false,
                            isNetPromoter: false,
                            isRatingReview: false,
                          });
                          setDropdownOpenTwo({
                            isOnlineRating: true,
                            isResponded: false,
                            isSentiment: false,
                            isNetPromoter: false,
                            isRatingReview: false,
                          });
                        }}
                      />
                      <div
                        className={`message ${
                          dropdownOpen?.isOnlineRating ? "open" : ""
                        } ${false ? "dark" : "light"}`}
                        style={{ height: "auto" }}
                      >
                        <div className="menu-row">
                          <img className="menu-logo" src={anaIcon} alt="" />
                          <p className="menu-title">Chart Type</p>
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: !dropdownOpen.isOnlineRating,
                              isResponded: false,
                              isSentiment: false,
                              isNetPromoter: false,
                              isRatingReview: false,
                            });
                            setDropMenuOptions({
                              isOnlineRating: {
                                isBarChart: true,
                                isLineChart: false,
                                isPieChart: false,
                              },
                              isResponded: dropMenuOptions.isResponded,
                              isSentiment: dropMenuOptions.isSentiment,
                              isNetPromoter: dropMenuOptions.isNetPromoter,
                              isRatingReview: dropMenuOptions.isRatingReview,
                            });
                          }}
                        >
                          <p
                            className={`menu-sub-title ${
                              dropMenuOptions?.isOnlineRating?.isBarChart
                                ? "active-filter"
                                : ""
                            }`}
                          >
                            Bar Chart
                          </p>
                          {dropMenuOptions?.isOnlineRating?.isBarChart ? (
                            <img className="menu-logo" src={tickIcon} alt="" />
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: !dropdownOpen.isOnlineRating,
                              isResponded: false,
                              isSentiment: false,
                              isNetPromoter: false,
                              isRatingReview: false,
                            });
                            setDropMenuOptions({
                              isOnlineRating: {
                                isBarChart: false,
                                isLineChart: true,
                                isPieChart: false,
                              },
                              isResponded: dropMenuOptions.isResponded,
                              isSentiment: dropMenuOptions.isSentiment,
                              isNetPromoter: dropMenuOptions.isNetPromoter,
                              isRatingReview: dropMenuOptions.isRatingReview,
                            });
                          }}
                        >
                          <p
                            className={`menu-sub-title ${
                              dropMenuOptions?.isOnlineRating?.isLineChart
                                ? "active-filter"
                                : ""
                            }`}
                          >
                            Line Chart
                          </p>
                          {dropMenuOptions?.isOnlineRating?.isLineChart ? (
                            <img className="menu-logo" src={tickIcon} alt="" />
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: !dropdownOpen.isOnlineRating,
                              isResponded: false,
                              isSentiment: false,
                              isNetPromoter: false,
                              isRatingReview: false,
                            });
                            setDropMenuOptions({
                              isOnlineRating: {
                                isBarChart: false,
                                isLineChart: false,
                                isPieChart: true,
                              },
                              isResponded: dropMenuOptions.isResponded,
                              isSentiment: dropMenuOptions.isSentiment,
                              isNetPromoter: dropMenuOptions.isNetPromoter,
                              isRatingReview: dropMenuOptions.isRatingReview,
                            });
                          }}
                        >
                          <p
                            className={`menu-sub-title ${
                              dropMenuOptions?.isOnlineRating?.isPieChart
                                ? "active-filter"
                                : ""
                            }`}
                          >
                            Pie Chart
                          </p>
                          {dropMenuOptions?.isOnlineRating?.isPieChart ? (
                            <img className="menu-logo" src={tickIcon} alt="" />
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: !dropdownOpen.isOnlineRating,
                              isResponded: false,
                              isSentiment: false,
                              isNetPromoter: false,
                              isRatingReview: false,
                            });
                            setIsDownload(true);
                          }}
                        >
                          <img
                            className="menu-logo"
                            src={downloadIcon}
                            alt=""
                          />
                          <p className="menu-title">Download</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="main-graph-container">
                    <OnlineRatingChart
                      chartRef={chartRef}
                      isHeight={250}
                      data={data}
                      chartType={dropMenuOptions?.isOnlineRating}
                    />
                    <div className="expand-icon">
                      <img
                        className="drag-icon"
                        onClick={() => {
                          setIsModalGraph("Online Rating Index");
                          setIsOpen(true);
                          setDropdownOpenTwo({
                            isOnlineRating: true,
                            isResponded: false,
                            isSentiment: false,
                            isNetPromoter: false,
                            isRatingReview: false,
                          });
                        }}
                        src={dragIcon}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`com-graph-box ${
                    isGraphType.isResponded ? "active-filter" : ""
                  }`}
                >
                  <div className="top-row">
                    <div className="inner-top-first">
                      <img
                        className="check-icon"
                        src={isGraphType.isResponded ? checkIcon : unCheckIcon}
                        alt=""
                        onClick={() => {
                          setIsGraphType({
                            isOnlineRating: false,
                            isResponded: !isGraphType.isResponded,
                            isSentiment: false,
                            isNetPromoter: false,
                            isRatingReview: false,
                          });
                        }}
                      />
                      <p className="title-top">
                        Responded&nbsp;&&nbsp;Unresponded&nbsp;Reviews
                      </p>
                    </div>
                    <div className="inner-top-last">
                      <img
                        src={threeDotIcon}
                        className="inner-top-last"
                        alt=""
                        onClick={() => {
                          setDropdownOpen({
                            isOnlineRating: false,
                            isResponded: !dropdownOpen.isResponded,
                            isSentiment: false,
                            isNetPromoter: false,
                            isRatingReview: false,
                          });
                          setDropdownOpenTwo({
                            isOnlineRating: false,
                            isResponded: true,
                            isSentiment: false,
                            isNetPromoter: false,
                            isRatingReview: false,
                          });
                        }}
                      />
                      <div
                        className={`message ${
                          dropdownOpen?.isResponded ? "open" : ""
                        } ${false ? "dark" : "light"}`}
                        style={{ height: "auto" }}
                      >
                        <div className="menu-row">
                          <img className="menu-logo" src={anaIcon} alt="" />
                          <p className="menu-title">Chart Type</p>
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: false,
                              isResponded: !dropdownOpen.isResponded,
                              isSentiment: false,
                              isNetPromoter: false,
                              isRatingReview: false,
                            });
                            setDropMenuOptions({
                              isOnlineRating: dropMenuOptions.isOnlineRating,
                              isResponded: {
                                isBarChart: true,
                                isLineChart: false,
                                isPieChart: false,
                              },
                              isSentiment: dropMenuOptions.isSentiment,
                              isNetPromoter: dropMenuOptions.isNetPromoter,
                              isRatingReview: dropMenuOptions.isRatingReview,
                            });
                          }}
                        >
                          <p
                            className={`menu-sub-title ${
                              dropMenuOptions?.isResponded?.isBarChart
                                ? "active-filter"
                                : ""
                            }`}
                          >
                            Bar Chart
                          </p>
                          {dropMenuOptions?.isResponded?.isBarChart ? (
                            <img className="menu-logo" src={tickIcon} alt="" />
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: false,
                              isResponded: !dropdownOpen.isResponded,
                              isSentiment: false,
                              isNetPromoter: false,
                              isRatingReview: false,
                            });
                            setDropMenuOptions({
                              isOnlineRating: dropMenuOptions.isOnlineRating,
                              isResponded: {
                                isBarChart: false,
                                isLineChart: true,
                                isPieChart: false,
                              },
                              isSentiment: dropMenuOptions.isSentiment,
                              isNetPromoter: dropMenuOptions.isNetPromoter,
                              isRatingReview: dropMenuOptions.isRatingReview,
                            });
                          }}
                        >
                          <p
                            className={`menu-sub-title ${
                              dropMenuOptions?.isResponded?.isLineChart
                                ? "active-filter"
                                : ""
                            }`}
                          >
                            Line Chart
                          </p>
                          {dropMenuOptions?.isResponded?.isLineChart ? (
                            <img className="menu-logo" src={tickIcon} alt="" />
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: false,
                              isResponded: !dropdownOpen.isResponded,
                              isSentiment: false,
                              isNetPromoter: false,
                              isRatingReview: false,
                            });
                            setDropMenuOptions({
                              isOnlineRating: dropMenuOptions.isOnlineRating,
                              isResponded: {
                                isBarChart: false,
                                isLineChart: false,
                                isPieChart: true,
                              },
                              isSentiment: dropMenuOptions.isSentiment,
                              isNetPromoter: dropMenuOptions.isNetPromoter,
                              isRatingReview: dropMenuOptions.isRatingReview,
                            });
                          }}
                        >
                          <p
                            className={`menu-sub-title ${
                              dropMenuOptions?.isResponded?.isPieChart
                                ? "active-filter"
                                : ""
                            }`}
                          >
                            Pie Chart
                          </p>
                          {dropMenuOptions?.isResponded?.isPieChart ? (
                            <img className="menu-logo" src={tickIcon} alt="" />
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: false,
                              isResponded: !dropdownOpen.isResponded,
                              isSentiment: false,
                              isNetPromoter: false,
                              isRatingReview: false,
                            });
                            setIsDownload(true);
                          }}
                        >
                          <img
                            className="menu-logo"
                            src={downloadIcon}
                            alt=""
                          />
                          <p className="menu-title">Download</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="main-graph-container">
                    <ReviewChart
                      respondedRef={respondedRef}
                      isHeight={250}
                      data={data}
                      chartType={dropMenuOptions?.isResponded}
                    />
                    <div className="expand-icon">
                      <img
                        className="drag-icon"
                        onClick={() => {
                          setIsModalGraph("Responded & Unresponded Reviews");
                          setIsOpen(true);
                          setDropdownOpenTwo({
                            isOnlineRating: false,
                            isResponded: true,
                            isSentiment: false,
                            isNetPromoter: false,
                            isRatingReview: false,
                          });
                        }}
                        src={dragIcon}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`com-graph-box ${
                    isGraphType.isSentiment ? "active-filter" : ""
                  }`}
                >
                  <div className="top-row">
                    <div className="inner-top-first">
                      <img
                        className="check-icon"
                        src={isGraphType.isSentiment ? checkIcon : unCheckIcon}
                        alt=""
                        onClick={() => {
                          setIsGraphType({
                            isOnlineRating: false,
                            isResponded: false,
                            isSentiment: !isGraphType.isSentiment,
                            isNetPromoter: false,
                            isRatingReview: false,
                          });
                        }}
                      />
                      <p className="title-top">Sentiment&nbsp;Score</p>
                    </div>
                    <div className="inner-top-last">
                      <img
                        src={threeDotIcon}
                        className="inner-top-last"
                        alt=""
                        onClick={() => {
                          setDropdownOpen({
                            isOnlineRating: false,
                            isResponded: false,
                            isSentiment: !dropdownOpen.isSentiment,
                            isNetPromoter: false,
                            isRatingReview: false,
                          });
                          setDropdownOpenTwo({
                            isOnlineRating: false,
                            isResponded: false,
                            isSentiment: true,
                            isNetPromoter: false,
                            isRatingReview: false,
                          });
                        }}
                      />
                      <div
                        className={`message ${
                          dropdownOpen?.isSentiment ? "open" : ""
                        } ${false ? "dark" : "light"}`}
                        style={{ height: "auto" }}
                      >
                        <div className="menu-row">
                          <img className="menu-logo" src={anaIcon} alt="" />
                          <p className="menu-title">Chart Type</p>
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: false,
                              isResponded: false,
                              isSentiment: !dropdownOpen.isSentiment,
                              isNetPromoter: false,
                              isRatingReview: false,
                            });
                            setDropMenuOptions({
                              isOnlineRating: dropMenuOptions.isOnlineRating,
                              isResponded: dropMenuOptions.isResponded,
                              isSentiment: {
                                isBarChart: true,
                                isLineChart: false,
                                isPieChart: false,
                              },
                              isNetPromoter: dropMenuOptions.isNetPromoter,
                              isRatingReview: dropMenuOptions.isRatingReview,
                            });
                          }}
                        >
                          <p
                            className={`menu-sub-title ${
                              dropMenuOptions?.isSentiment?.isBarChart
                                ? "active-filter"
                                : ""
                            }`}
                          >
                            Bar Chart
                          </p>
                          {dropMenuOptions?.isSentiment?.isBarChart ? (
                            <img className="menu-logo" src={tickIcon} alt="" />
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: false,
                              isResponded: false,
                              isSentiment: !dropdownOpen.isSentiment,
                              isNetPromoter: false,
                              isRatingReview: false,
                            });
                            setDropMenuOptions({
                              isOnlineRating: dropMenuOptions.isOnlineRating,
                              isResponded: dropMenuOptions.isResponded,
                              isSentiment: {
                                isBarChart: false,
                                isLineChart: true,
                                isPieChart: false,
                              },
                              isNetPromoter: dropMenuOptions.isNetPromoter,
                              isRatingReview: dropMenuOptions.isRatingReview,
                            });
                          }}
                        >
                          <p
                            className={`menu-sub-title ${
                              dropMenuOptions?.isSentiment?.isLineChart
                                ? "active-filter"
                                : ""
                            }`}
                          >
                            Line Chart
                          </p>
                          {dropMenuOptions?.isSentiment?.isLineChart ? (
                            <img className="menu-logo" src={tickIcon} alt="" />
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: false,
                              isResponded: false,
                              isSentiment: !dropdownOpen.isSentiment,
                              isNetPromoter: false,
                              isRatingReview: false,
                            });
                            setDropMenuOptions({
                              isOnlineRating: dropMenuOptions.isOnlineRating,
                              isResponded: dropMenuOptions.isResponded,
                              isSentiment: {
                                isBarChart: false,
                                isLineChart: false,
                                isPieChart: true,
                              },
                              isNetPromoter: dropMenuOptions.isNetPromoter,
                              isRatingReview: dropMenuOptions.isRatingReview,
                            });
                          }}
                        >
                          <p
                            className={`menu-sub-title ${
                              dropMenuOptions?.isSentiment?.isPieChart
                                ? "active-filter"
                                : ""
                            }`}
                          >
                            Pie Chart
                          </p>
                          {dropMenuOptions?.isSentiment?.isPieChart ? (
                            <img className="menu-logo" src={tickIcon} alt="" />
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: false,
                              isResponded: false,
                              isSentiment: !dropdownOpen.isSentiment,
                              isNetPromoter: false,
                              isRatingReview: false,
                            });
                            setIsDownload(true);
                          }}
                        >
                          <img
                            className="menu-logo"
                            src={downloadIcon}
                            alt=""
                          />
                          <p className="menu-title">Download</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="main-graph-container">
                    <SentimentScore
                      sentimentRef={sentimentRef}
                      isHeight={250}
                      data={data}
                      chartType={dropMenuOptions?.isSentiment}
                    />
                    <div className="expand-icon">
                      <img
                        className="drag-icon"
                        onClick={() => {
                          setIsModalGraph("Sentiment Score");
                          setIsOpen(true);
                          setDropdownOpenTwo({
                            isOnlineRating: false,
                            isResponded: false,
                            isSentiment: true,
                            isNetPromoter: false,
                            isRatingReview: false,
                          });
                        }}
                        src={dragIcon}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="second-row-graph">
                <div
                  className={`com-second-graph-box ${
                    isGraphType.isNetPromoter ? "active-filter" : ""
                  }`}
                >
                  <div className="top-row">
                    <div className="inner-top-first">
                      <img
                        className="check-icon"
                        src={
                          isGraphType.isNetPromoter ? checkIcon : unCheckIcon
                        }
                        onClick={() => {
                          setIsGraphType({
                            isOnlineRating: false,
                            isResponded: false,
                            isSentiment: false,
                            isNetPromoter: !isGraphType.isNetPromoter,
                            isRatingReview: false,
                          });
                        }}
                        alt=""
                      />
                      <p className="title-top">Net&nbsp;Promotor&nbsp;Score</p>
                    </div>
                    <div className="inner-top-last">
                      <img
                        src={threeDotIcon}
                        className="inner-top-last"
                        alt=""
                        onClick={() => {
                          setDropdownOpen({
                            isOnlineRating: false,
                            isResponded: false,
                            isSentiment: false,
                            isNetPromoter: !dropdownOpen.isNetPromoter,
                            isRatingReview: false,
                          });
                          setDropdownOpenTwo({
                            isOnlineRating: false,
                            isResponded: false,
                            isSentiment: false,
                            isNetPromoter: true,
                            isRatingReview: false,
                          });
                        }}
                      />
                      <div
                        className={`message ${
                          dropdownOpen?.isNetPromoter ? "open" : ""
                        } ${false ? "dark" : "light"}`}
                        style={{ height: "auto" }}
                      >
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: false,
                              isResponded: false,
                              isSentiment: false,
                              isNetPromoter: !dropdownOpen?.isNetPromoter,
                              isRatingReview: false,
                            });
                            setDropMenuOptions({
                              isOnlineRating: dropMenuOptions.isOnlineRating,
                              isResponded: dropMenuOptions.isResponded,
                              isSentiment: dropMenuOptions.isSentiment,
                              isNetPromoter: {
                                isBarChart: true,
                                isLineChart: false,
                                isPieChart: false,
                              },
                              isRatingReview: dropMenuOptions.isRatingReview,
                            });
                          }}
                        >
                          <img className="menu-logo" src={anaIcon} alt="" />
                          <p className="menu-title">Chart Type</p>
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: false,
                              isResponded: false,
                              isSentiment: false,
                              isNetPromoter: !dropdownOpen?.isNetPromoter,
                              isRatingReview: false,
                            });
                            setDropMenuOptions({
                              isOnlineRating: dropMenuOptions.isOnlineRating,
                              isResponded: dropMenuOptions.isResponded,
                              isSentiment: dropMenuOptions.isSentiment,
                              isNetPromoter: {
                                isBarChart: true,
                                isLineChart: false,
                                isPieChart: false,
                              },
                              isRatingReview: dropMenuOptions.isRatingReview,
                            });
                          }}
                        >
                          <p
                            className={`menu-sub-title ${
                              dropMenuOptions?.isNetPromoter?.isBarChart
                                ? "active-filter"
                                : ""
                            }`}
                          >
                            Bar Chart
                          </p>
                          {dropMenuOptions?.isNetPromoter?.isBarChart ? (
                            <img className="menu-logo" src={tickIcon} alt="" />
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: false,
                              isResponded: false,
                              isSentiment: false,
                              isNetPromoter: !dropdownOpen?.isNetPromoter,
                              isRatingReview: false,
                            });
                            setDropMenuOptions({
                              isOnlineRating: dropMenuOptions.isOnlineRating,
                              isResponded: dropMenuOptions.isResponded,
                              isSentiment: dropMenuOptions.isSentiment,
                              isNetPromoter: {
                                isBarChart: false,
                                isLineChart: true,
                                isPieChart: false,
                              },
                              isRatingReview: dropMenuOptions.isRatingReview,
                            });
                          }}
                        >
                          <p
                            className={`menu-sub-title ${
                              dropMenuOptions?.isNetPromoter?.isLineChart
                                ? "active-filter"
                                : ""
                            }`}
                          >
                            Line Chart
                          </p>
                          {dropMenuOptions?.isNetPromoter?.isLineChart ? (
                            <img className="menu-logo" src={tickIcon} alt="" />
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: false,
                              isResponded: false,
                              isSentiment: false,
                              isNetPromoter: !dropdownOpen?.isNetPromoter,
                              isRatingReview: false,
                            });
                            setDropMenuOptions({
                              isOnlineRating: dropMenuOptions.isOnlineRating,
                              isResponded: dropMenuOptions.isResponded,
                              isSentiment: dropMenuOptions.isSentiment,
                              isNetPromoter: {
                                isBarChart: false,
                                isLineChart: false,
                                isPieChart: true,
                              },
                              isRatingReview: dropMenuOptions.isRatingReview,
                            });
                          }}
                        >
                          <p
                            className={`menu-sub-title ${
                              dropMenuOptions?.isNetPromoter?.isPieChart
                                ? "active-filter"
                                : ""
                            }`}
                          >
                            Pie Chart
                          </p>
                          {dropMenuOptions?.isNetPromoter?.isPieChart ? (
                            <img className="menu-logo" src={tickIcon} alt="" />
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: false,
                              isResponded: false,
                              isSentiment: false,
                              isNetPromoter: !dropdownOpen?.isNetPromoter,
                              isRatingReview: false,
                            });
                            setIsDownload(true);
                          }}
                        >
                          <img
                            className="menu-logo"
                            src={downloadIcon}
                            alt=""
                          />
                          <p className="menu-title">Download</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="main-graph-container"
                    style={{
                      // marginLeft: dropMenuOptions?.isNetPromoter?.isBarChart
                      //   ? "-15rem"
                      //   : "0",
                    }}
                  >
                    <NetPromoter
                      netPromoterRef={netPromoterRef}
                      isHeight={250}
                      data={data}
                      chartType={dropMenuOptions?.isNetPromoter}
                    />
                    <div className="expand-icon" style={{ right: "0px" }}>
                      <img
                        className="drag-icon"
                        onClick={() => {
                          setIsModalGraph("Net Promotor Score");
                          setIsOpen(true);
                          setDropdownOpenTwo({
                            isOnlineRating: false,
                            isResponded: false,
                            isSentiment: false,
                            isNetPromoter: true,
                            isRatingReview: false,
                          });
                        }}
                        src={dragIcon}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`com-second-graph-box ${
                    isGraphType.isRatingReview ? "active-filter" : ""
                  }`}
                >
                  <div className="top-row">
                    <div className="inner-top-first">
                      <img
                        className="check-icon"
                        src={
                          isGraphType.isRatingReview ? checkIcon : unCheckIcon
                        }
                        onClick={() => {
                          setIsGraphType({
                            isOnlineRating: false,
                            isResponded: false,
                            isSentiment: false,
                            isNetPromoter: false,
                            isRatingReview: !isGraphType.isRatingReview,
                          });
                        }}
                        alt=""
                      />
                      <p className="title-top">Ratings&nbsp;&&nbsp;Reviews</p>
                    </div>
                    <div className="inner-top-last">
                      <img
                        src={threeDotIcon}
                        className="inner-top-last"
                        alt=""
                        onClick={() => {
                          setDropdownOpen({
                            isOnlineRating: false,
                            isResponded: false,
                            isSentiment: false,
                            isNetPromoter: false,
                            isRatingReview: !dropdownOpen.isRatingReview,
                          });
                          setDropdownOpenTwo({
                            isOnlineRating: false,
                            isResponded: false,
                            isSentiment: false,
                            isNetPromoter: false,
                            isRatingReview: true,
                          });
                        }}
                      />
                      <div
                        className={`message ${
                          dropdownOpen?.isRatingReview ? "open" : ""
                        } ${false ? "dark" : "light"}`}
                        style={{ height: "auto" }}
                      >
                        <div className="menu-row">
                          <img className="menu-logo" src={anaIcon} alt="" />
                          <p className="menu-title">Chart Type</p>
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: false,
                              isResponded: false,
                              isSentiment: false,
                              isNetPromoter: false,
                              isRatingReview: !dropdownOpen?.isRatingReview,
                            });
                            setDropMenuOptions({
                              isOnlineRating: dropMenuOptions.isOnlineRating,
                              isResponded: dropMenuOptions.isResponded,
                              isSentiment: dropMenuOptions.isSentiment,
                              isNetPromoter: dropMenuOptions.isNetPromoter,
                              isRatingReview: {
                                isBarChart: true,
                                isLineChart: false,
                                isPieChart: false,
                              },
                            });
                          }}
                        >
                          <p
                            className={`menu-sub-title ${
                              dropMenuOptions?.isRatingReview?.isBarChart
                                ? "active-filter"
                                : ""
                            }`}
                          >
                            Bar Chart
                          </p>
                          {dropMenuOptions?.isRatingReview?.isBarChart ? (
                            <img className="menu-logo" src={tickIcon} alt="" />
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: false,
                              isResponded: false,
                              isSentiment: false,
                              isNetPromoter: false,
                              isRatingReview: !dropdownOpen?.isRatingReview,
                            });
                            setDropMenuOptions({
                              isOnlineRating: dropMenuOptions.isOnlineRating,
                              isResponded: dropMenuOptions.isResponded,
                              isSentiment: dropMenuOptions.isSentiment,
                              isNetPromoter: dropMenuOptions.isNetPromoter,
                              isRatingReview: {
                                isBarChart: false,
                                isLineChart: true,
                                isPieChart: false,
                              },
                            });
                          }}
                        >
                          <p
                            className={`menu-sub-title ${
                              dropMenuOptions?.isRatingReview?.isLineChart
                                ? "active-filter"
                                : ""
                            }`}
                          >
                            Line Chart
                          </p>
                          {dropMenuOptions?.isRatingReview?.isLineChart ? (
                            <img className="menu-logo" src={tickIcon} alt="" />
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: false,
                              isResponded: false,
                              isSentiment: false,
                              isNetPromoter: false,
                              isRatingReview: !dropdownOpen?.isRatingReview,
                            });
                            setDropMenuOptions({
                              isOnlineRating: dropMenuOptions.isOnlineRating,
                              isResponded: dropMenuOptions.isResponded,
                              isSentiment: dropMenuOptions.isSentiment,
                              isNetPromoter: dropMenuOptions.isNetPromoter,
                              isRatingReview: {
                                isBarChart: false,
                                isLineChart: false,
                                isPieChart: true,
                              },
                            });
                          }}
                        >
                          <p
                            className={`menu-sub-title ${
                              dropMenuOptions?.isRatingReview?.isPieChart
                                ? "active-filter"
                                : ""
                            }`}
                          >
                            Pie Chart
                          </p>
                          {dropMenuOptions?.isRatingReview?.isPieChart ? (
                            <img className="menu-logo" src={tickIcon} alt="" />
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className="menu-row"
                          onClick={() => {
                            setDropdownOpen({
                              isOnlineRating: false,
                              isResponded: false,
                              isSentiment: false,
                              isNetPromoter: false,
                              isRatingReview: !dropdownOpen?.isRatingReview,
                            });
                            setIsDownload(true);
                          }}
                        >
                          <img
                            className="menu-logo"
                            src={downloadIcon}
                            alt=""
                          />
                          <p className="menu-title">Download</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="main-graph-container"
                    style={{
                      // marginLeft: dropMenuOptions?.isRatingReview?.isBarChart
                      //   ? "-15rem"
                      //   : "0",
                    }}
                  >
                    <NetPromoterTwo
                      ratingReviewRef={ratingReviewRef}
                      isHeight={250}
                      data={data}
                      chartType={dropMenuOptions?.isRatingReview}
                    />
                    {/* <div className="expand-icon" style={{ right: "-120px" }}> */}
                    <div className="expand-icon" style={{ right: "0px" }}>
                      <img
                        className="drag-icon"
                        onClick={() => {
                          setIsModalGraph("Ratings & Reviews");
                          setIsOpen(true);
                          setDropdownOpenTwo({
                            isOnlineRating: false,
                            isResponded: false,
                            isSentiment: false,
                            isNetPromoter: false,
                            isRatingReview: true,
                          });
                        }}
                        src={dragIcon}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        isClose={true}
        handleClose={setIsOpen}
        component={
          <div className="popup-container">
            <div className="title-row-container">
              <p className="title-top">{isModalGraph}</p>
              <div className="second-container">
                <div className="monthly-filter-container">
                  <p
                    className={`month-select ${
                      filterType === "monthly" ? "active-filter" : ""
                    }`}
                    onClick={() => {
                      setFilterType("monthly");
                      getFilteredData("monthly");
                    }}
                  >
                    Monthly
                  </p>
                  <p
                    className={`month-select ${
                      filterType === "quarterly" ? "active-filter" : ""
                    }`}
                    onClick={() => {
                      setFilterType("quarterly");
                      getFilteredData("quarterly");
                    }}
                  >
                    Quarterly
                  </p>
                  <p
                    className={`month-select ${
                      filterType === "yearly" ? "active-filter" : ""
                    }`}
                    onClick={() => {
                      setFilterType("yearly");
                      getFilteredData("yearly");
                    }}
                  >
                    Yearly
                  </p>
                </div>
                <div className="inner-top-last">
                  <img
                    src={threeBigDotIcon}
                    className="inner-top-last"
                    alt=""
                    onClick={() => {
                      setIsPopThreeDot(!isPopThreeDot);
                    }}
                  />
                  <div
                    className={`message ${isPopThreeDot ? "open" : ""} ${
                      false ? "dark" : "light"
                    }`}
                    style={{ height: "auto" }}
                  >
                    <div className="menu-row">
                      <img className="menu-logo" src={anaIcon} alt="" />
                      <p className="menu-title">Chart Type</p>
                    </div>
                    <div
                      className="menu-row"
                      onClick={() => {
                        setPopGraphType({
                          isBarChart: true,
                          isLineChart: false,
                          isPieChart: false,
                        });
                        setIsPopThreeDot(!isPopThreeDot);
                      }}
                    >
                      <p
                        className={`menu-sub-title ${
                          popGraphType?.isBarChart ? "active-filter" : ""
                        }`}
                      >
                        Bar Chart
                      </p>
                      {popGraphType?.isBarChart ? (
                        <img className="menu-logo" src={tickIcon} alt="" />
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className="menu-row"
                      onClick={() => {
                        setPopGraphType({
                          isBarChart: false,
                          isLineChart: true,
                          isPieChart: false,
                        });
                        setIsPopThreeDot(!isPopThreeDot);
                      }}
                    >
                      <p
                        className={`menu-sub-title ${
                          popGraphType?.isLineChart ? "active-filter" : ""
                        }`}
                      >
                        Line Chart
                      </p>
                      {popGraphType?.isLineChart ? (
                        <img className="menu-logo" src={tickIcon} alt="" />
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className="menu-row"
                      onClick={() => {
                        setPopGraphType({
                          isBarChart: false,
                          isLineChart: false,
                          isPieChart: true,
                        });
                        setIsPopThreeDot(!isPopThreeDot);
                      }}
                    >
                      <p
                        className={`menu-sub-title ${
                          popGraphType?.isPieChart ? "active-filter" : ""
                        }`}
                      >
                        Pie Chart
                      </p>
                      {popGraphType?.isPieChart ? (
                        <img className="menu-logo" src={tickIcon} alt="" />
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className="menu-row"
                      onClick={() => {
                        setIsDownload(true);
                        setIsPopThreeDot(!isPopThreeDot);
                      }}
                    >
                      <img className="menu-logo" src={downloadIcon} alt="" />
                      <p className="menu-title">Download</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {getGraph(isModalGraph)}
            {/* <OnlineRatingChart isHeight={350} /> */}
          </div>
        }
      />
      <ModalTwo
        isOpen={isDownload}
        component={
          <div className="popup-download">
            <img className="doc-image" src={fileLogo} alt="" />
            <p className="download-title">Download Report</p>
            <div className="drop-down-container">
              <SelectTemp
                options={dropOptions}
                value={dropOptions.filter(
                  (val) => val.value === selectDropOptions
                )}
                placeholder="Select Retake"
                onChange={(e) => {
                  setSelectDropOptions(e.value);
                }}
              />
            </div>
            <div className="button-group">
              <div
                className="cancel-button"
                onClick={() => {
                  setIsDownload(false);
                }}
              >
                Cancel
              </div>
              <div
                className="apply-button"
                onClick={() => {
                  if (selectDropOptions === "PDF") {
                    handleDownloadPDF();
                  } else if (selectDropOptions === "CSV") {
                    downloadCSV();
                  } else {
                    return "";
                  }
                }}
              >
                Download
              </div>
            </div>
          </div>
        }
      />
      {isFilter ? (
        <div className="parent-filter-container">
          <div className="filter-left-container">
            <div className="first-inner-box">
              <div className="inner-head">
                <p className="filter-title">Filters</p>
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsFilter(false);
                  }}
                  src={greyCrossIcon}
                  className="cross-icon"
                  alt=""
                />
              </div>
              <div className="location-container">
                <div className="first-location">
                  <p className="location-title">Location</p>
                  <p
                    className="clear-text"
                    onClick={() => {
                      setPendingCities([]);
                    }}
                  >
                    Clear
                  </p>
                </div>
                <div className="search-container">
                  <input placeholder="Search" />
                  <img className="search-icon" src={searchInputIcon} alt="" />
                </div>
                {/* <div className="city-list">
                  <img src={checkIcon} className="check-icon" alt="" />
                  <p className="city-label">Select All</p>
                </div> */}
                <div>
                  {uniqueCities.map((city) => (
                    <div className="city-list" key={city}>
                      <img
                        src={
                          pendingCities.includes(city) ? checkIcon : unCheckIcon
                        }
                        onClick={() => handleCityChange(city)}
                        className="check-icon"
                        alt=""
                      />
                      <p className="city-label">{city}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="location-container">
                <div
                  className="first-location"
                  style={{ marginBottom: "1rem" }}
                >
                  <p className="location-title">Date Range</p>
                  <p className="clear-text">Clear</p>
                </div>
                <div className="city-list">
                  <img
                    src={
                      pendingRange === "Last 7 Days" ? checkRadio : unCheckRadio
                    }
                    onClick={() => {
                      setPendingRange("Last 7 Days");
                    }}
                    className="check-icon"
                    alt=""
                  />
                  <p className="city-label">Last 7 Days</p>
                </div>
                <div className="city-list">
                  <img
                    src={
                      pendingRange === "Last 30 Days"
                        ? checkRadio
                        : unCheckRadio
                    }
                    onClick={() => {
                      setPendingRange("Last 30 Days");
                    }}
                    className="check-icon"
                    alt=""
                  />
                  <p className="city-label">Last 30 Days</p>
                </div>
                <div className="city-list">
                  <img
                    src={
                      pendingRange === "Last 3 Months"
                        ? checkRadio
                        : unCheckRadio
                    }
                    onClick={() => {
                      setPendingRange("Last 3 Months");
                    }}
                    className="check-icon"
                    alt=""
                  />
                  <p className="city-label">Last 3 Months</p>
                </div>
                <div className="city-list">
                  <img
                    src={pendingRange === "Yearly" ? checkRadio : unCheckRadio}
                    onClick={() => {
                      setPendingRange("Yearly");
                    }}
                    className="check-icon"
                    alt=""
                  />
                  <p className="city-label">Yearly</p>
                </div>
                {/* <div className="city-list">
                <img src={unCheckRadio} className="check-icon" alt="" />
                <p className="city-label">Custom Date Range</p>
              </div> */}
              </div>
              <div className="second-container">
                <p
                  className="cancel-button"
                  onClick={() => {
                    setPendingCities([...uniqueCities]); // reset to all cities
                    setPendingRange(""); // or your default range
                    setData(originalData); // show all data
                    setIsFilter(false); // close the filter panel
                  }}
                >
                  Reset
                </p>
                <div
                  className="apply-button"
                  onClick={() => {
                    handleApplyFilters();
                  }}
                >
                  Apply
                </div>
              </div>
            </div>
          </div>
          <div className="filter-right-container"></div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Homepage;
