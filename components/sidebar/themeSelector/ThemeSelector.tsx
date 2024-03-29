"use client";

import { useThemeSlice } from "@/store/themeSlice";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState } from "react";
import { Collapse, TabsHeader, Tabs, Tab } from "@material-tailwind/react";
import clsx from "clsx";
import ThemeBall from "./ThemeBall";
import { ThemeProps, themes } from "@/themes/theme";
import { useTheme } from "@/hooks/useTheme";

const ThemeSelector = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const { baseTextColor } = theme.colors as ThemeProps["colors"];
  const [activeThemeBall, setActiveThemeBall] = useState(theme.themeId);
  const themeSelect = useThemeSlice((state) => state.themeSelect);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const themeId: string = event.currentTarget.id;
      themeSelect(themes[parseInt(themeId)]);
    },
    [theme, themeSelect]
  );

  return (
    <div className=" items-end relative">
      <Collapse open={isModalOpen} className="z-50 space-y-4">
        <hr className=" w-full" style={{ borderColor: baseTextColor }} />
        <Tabs
          value={activeThemeBall}
          className="flex flex-col w-full rounded-lg overflow-hidden space-y-2 "
        >
          {[...Array(2)].map((valueRow, indexRow) => {
            return (
              <TabsHeader
                key={indexRow}
                indicatorProps={{
                  style: { backgroundColor: baseTextColor },
                  className: "rounded-full outline-2 blur-[2px]",
                }}
                className="flex flex-row flex-nowrap justify-between w-full bg-opacity-0"
              >
                {[...Array(3)].map((valueCol, indexCol) => {
                  return (
                    <Tab
                      key={indexCol + 3 * indexRow}
                      value={indexCol + 3 * indexRow}
                      onClick={() =>
                        setActiveThemeBall(indexCol + 3 * indexRow)
                      }
                      className="w-fit p-[5px] focus:bg-opacity-0 focus:outline-4 focus:outline-blue-900 rounded-full"
                    >
                      <ThemeBall
                        id={`${indexCol + 3 * indexRow}`}
                        isModalOpen={isModalOpen}
                        theme={themes[indexCol + 3 * indexRow]}
                        onClick={handleClick}
                      />
                    </Tab>
                  );
                })}
              </TabsHeader>
            );
          })}
        </Tabs>
      </Collapse>
      <div className="flex flex-col items-end relative space-y-4">
        <hr
          style={{ borderColor: baseTextColor }}
          className={clsx(
            `relative w-full`,
            !isModalOpen && "border-gray-300",
            isModalOpen && "border-none"
          )}
        />
        <Button
          secondary
          variant="text"
          onClick={() => {
            setIsModalOpen((current) => !current);
          }}
        >
          {isModalOpen ? (
            <div className="flex justify-end items-center gap-4 text-sm duration-[600ms] px-4">
              Done
              <FontAwesomeIcon icon={faCheck} />
            </div>
          ) : (
            <div className="flex justify-end items-center gap-4 text-sm px-4">
              Change Theme
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ThemeSelector;
