"use client";

import { useZustandStore } from "@/store/ZutandStore";
import ButtonComp from "@/components/ButtonComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { ReactNode, useState } from "react";
import {
  Collapse,
  TabsHeader,
  Tabs,
  Tab,
  useTheme,
} from "@material-tailwind/react";
import clsx from "clsx";
import ThemeBall from "./ThemeBall";
import { themes } from "@/themes/theme";

const ThemeSelector = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const { primaryColor } = theme.colors;
  const [activeThemeBall, setActiveThemeBall] = useState(theme.themeId);
  const themeStore = useZustandStore((state) => state.theme);
  const themeSelect = useZustandStore((state) => state.themeSelect);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const themeId: string = event.currentTarget.id;
    themeSelect(themes[parseInt(themeId)]);
  };

  return (
    <div className=" items-end relative">
      <Collapse open={isModalOpen} className="z-50 space-y-4">
        <hr className="border-gray-300 w-full" />
        <Tabs
          value={activeThemeBall}
          className="flex flex-col w-full rounded-lg overflow-hidden space-y-2 "
        >
          {[...Array(2)].map((valueRow, indexRow) => {
            return (
              <TabsHeader
                key={indexRow}
                indicatorProps={{
                  style: { backgroundColor: primaryColor },
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
          className={clsx(
            `relative w-full`,
            !isModalOpen && "border-gray-300",
            isModalOpen && "border-none"
          )}
        />
        <ButtonComp
          variant="text"
          onClick={() => {
            setIsModalOpen((current) => !current);
          }}
        >
          {isModalOpen ? (
            <div className="flex justify-end space-x-4 text-sm">
              <div>Done</div>
              <div>
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </div>
          ) : (
            <div className="flex justify-end space-x-4 text-sm">
              <div>Change Theme</div>
              <div>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </div>
          )}
        </ButtonComp>
      </div>
    </div>
  );
};

export default ThemeSelector;
