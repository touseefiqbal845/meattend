import { SvgIcon } from "@mui/material";

import { ReactComponent as ReportIcon } from "../../../assets/navIcons/report.svg";
import { ReactComponent as ReportIconActive } from "../../../assets/navIcons/report_a.svg";
import { ReactComponent as CompanyIcon } from "../../../assets/navIcons/information.svg";
import { ReactComponent as CompanyIconActive } from "../../../assets/navIcons/information_a.svg";
import { ReactComponent as ScanIcon } from "../../../assets/navIcons/scan.svg";
import { ReactComponent as ScanIconActive } from "../../../assets/navIcons/scan_a.svg";
import { ReactComponent as ProIcon } from "../../../assets/navIcons/pro.svg";
import { ReactComponent as CaseIcon } from "../../../assets/navIcons/case.svg";
import { ReactComponent as CaseIconActive } from "../../../assets/navIcons/case_a.svg";

export const items = [
  {
    title: "New Companies",
    path: "/staffing/newcompanines",
    icon: (
      <SvgIcon fontSize="small">
        <CompanyIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <CompanyIconActive />
      </SvgIcon>
    ),
  },
  {
    title: "Existing Companies",
    path: "/staffing/existingcompanies",
    icon: (
      <SvgIcon fontSize="small">
        <CompanyIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <CompanyIconActive />
      </SvgIcon>
    ),
  },
  {
    title: "Manage Users",
    path: "/staffing/users",
    icon: (
      <SvgIcon fontSize="small">
        <ProIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <ProIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Report",
    path: "/staffing/reports",
    icon: (
      <SvgIcon fontSize="small">
        <ReportIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <ReportIconActive />
      </SvgIcon>
    ),
  },
  {
    title: "Case",
    path: "/staffing/case",
    icon: (
      <SvgIcon fontSize="small">
        <CaseIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <CaseIconActive />
      </SvgIcon>
    ),
  },
  {
    title: "Finance",
    path: "/staffing/finance",
    icon: (
      <SvgIcon fontSize="small">
        <CompanyIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <CompanyIconActive />
      </SvgIcon>
    ),
  },
  {
    title: "Discount Scanner",
    path: "/staffing/scanner",
    icon: (
      <SvgIcon fontSize="small">
        <ScanIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <ScanIconActive />
      </SvgIcon>
    ),
  },
  {
    title: "Live Stream",
    path: "/staffing/livestreaming",
    icon: (
      <SvgIcon fontSize="small">
        <ScanIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <ScanIconActive />
      </SvgIcon>
    ),
  },


];
