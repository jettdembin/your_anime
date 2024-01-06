"use client";

import { useState } from "react";

import { BookmarkIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

import * as HoverCard from "@radix-ui/react-hover-card";

const AddToListModal = () => {
  const [status, setStatus] = useState(null);

  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div className="bg-white p-4 rounded-full">
          <BookmarkIcon />
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          data-side="bottom"
          side="top"
          className="HoverCardContent z-50 shadow-xl"
          sideOffset={5}
        >
          <div className=" bg-white p-4 m-auto rounded-md">
            <form action="">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <select value={status} onValueChange={setStatus}>
                    <option id="status" value="WATCHED">
                      Completed
                    </option>
                    <option id="status" value="">
                      Rewatching
                    </option>
                    <option id="status" value="WATCHING">
                      Watching
                    </option>
                    <option id="status" value="TO_WATCH">
                      Planning
                    </option>
                    <option id="status" value="considering">
                      Considering
                    </option>
                    <option id="status" value="paused">
                      Paused
                    </option>
                    <option id="status" value="DROPPED">
                      Dropped
                    </option>
                    <option id="status" value="skipping">
                      Skipping
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="raank"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rating
                  </label>
                  <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <option id="rank" value="10">
                      10 (Masterpiece)
                    </option>
                    <option id="rank" value="9">
                      9 (Incredible)
                    </option>
                    <option id="rank" value="8">
                      8 (Great)
                    </option>
                    <option id="rank" value="7">
                      7 (Good)
                    </option>
                    <option id="rank" value="6">
                      6 (Okay)
                    </option>
                    <option id="rank" value="5">
                      5 (Mediocre)
                    </option>
                    <option id="rank" value="4">
                      4 (Poor)
                    </option>
                    <option id="rank" value="3">
                      3 (Bad)
                    </option>
                    <option id="rank" value="2">
                      2 (Awful)
                    </option>
                    <option id="rank" value="1">
                      1 (Atrocious)
                    </option>
                    <option id="rank" value="">
                      –
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Progress
                  </label>
                  <input
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    name="rewatches"
                    type="number"
                    min="0"
                    max="999"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Rewatches
                  </label>
                  <input
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    name="rewatches"
                    type="number"
                    min="0"
                    max="999"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Started
                  </label>
                  <input
                    id="library_editor_startedAt"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    name="started_at"
                    type="date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Finished
                  </label>
                  <input
                    id="library_editor_finishedAt"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    name="finished_at"
                    type="date"
                  />
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Personal Notes
                  </label>
                  <textarea
                    id="library_editor_notes"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    name="notes"
                    rows="6"
                  ></textarea>
                  <small className="text-secondary">
                    <span>Only visible to you</span>
                    <span className="float-right">500 / 500</span>
                  </small>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="cursor-pointer">
                  <Button variant="outline" color="blue">
                    <div className="py-1 px-2">Add to List</div>
                    <span className="material-icons">chevron_right</span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <HoverCard.Arrow className="HoverCardArrow" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default AddToListModal;
