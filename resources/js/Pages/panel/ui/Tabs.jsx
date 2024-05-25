import React from 'react'
import { Tabs, Checkbox,Label } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
const Tabsx = () => {
  return (
    <Tabs aria-label="Default tabs" style="default">
    <Tabs.Item active
    title={ <div className="flex items-center gap-2">
        <Checkbox id="accept" defaultChecked  />
        <Label htmlFor="accept" className="flex">
          Orison Managua

        </Label>
      </div>}>


      This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
      Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
      control the content visibility and styling.
      <Checkbox label="Checkbox" />
      <div className="flex items-center gap-2">
        <Checkbox id="accept" defaultChecked  />
        <Label htmlFor="accept" className="flex">
          Orison Managua

        </Label>
      </div>
    </Tabs.Item>

  </Tabs>
  );
}

export default Tabsx
