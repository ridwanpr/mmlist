import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import Accordion from "../UI/Accordion";
import { LuInfo, LuSword, LuSwords } from "react-icons/lu";

const TriggerWarning = () => {
  const tablistItems = [
    "All",
    "Violence & Gore",
    "Sexual Content",
    "Mental Health",
    "Child Safety",
  ];

  const triggerContent = [
    {
      category: "All",
      items: [
        { id: 1, label: "Graphic Gore", category: "Violence & Gore" },
        { id: 2, label: "Major Character Death", category: "Violence & Gore" },
        { id: 3, label: "Sexual Assault", category: "Sexual Content" },
        { id: 4, label: "NTR / Cheating", category: "Sexual Content" },
        { id: 5, label: "Suicide / Self-Harm", category: "Mental Health" },
        { id: 6, label: "Depression", category: "Mental Health" },
        { id: 7, label: "Child Abuse", category: "Child Safety" },
        { id: 8, label: "Grooming", category: "Child Safety" },
      ],
    },
    {
      category: "Violence & Gore",
      items: [
        { id: 1, label: "Graphic Gore", category: "Violence & Gore" },
        { id: 2, label: "Major Character Death", category: "Violence & Gore" },
        { id: 9, label: "Torture", category: "Violence & Gore" },
      ],
    },
    {
      category: "Sexual Content",
      items: [
        { id: 3, label: "Sexual Assault", category: "Sexual Content" },
        { id: 4, label: "NTR / Cheating", category: "Sexual Content" },
        { id: 10, label: "Dubious Consent", category: "Sexual Content" },
      ],
    },
    {
      category: "Mental Health",
      items: [
        { id: 5, label: "Suicide / Self-Harm", category: "Mental Health" },
        { id: 6, label: "Depression", category: "Mental Health" },
        { id: 11, label: "PTSD Flashbacks", category: "Mental Health" },
      ],
    },
    {
      category: "Child Safety",
      items: [
        { id: 7, label: "Child Abuse", category: "Child Safety" },
        { id: 8, label: "Grooming", category: "Child Safety" },
        { id: 12, label: "Child Soldiers", category: "Child Safety" },
      ],
    },
  ];

  return (
    <div className="mt-8 flex flex-col gap-4">
      {/* Trigger Header */}
      <div>
        <h2 className="text-text text-xl font-semibold">Trigger Warnings</h2>
        <p className="text-text-muted flex flex-wrap items-center gap-1 text-sm">
          <LuInfo /> The community helps identify and rate the presence of
          potentially distressing content in this anime.
          <span className="font-bold italic">
            Click each trigger for more details. Might contain spoiler
          </span>
        </p>
      </div>
      {/* Trigger Content */}
      <div className="flex w-full flex-col gap-2">
        <Disclosure as="div" className="border-border w-full rounded-lg border">
          <DisclosureButton className="border-border hover:bg-surface-alt bg-surface flex w-full items-center justify-between gap-2 rounded-lg border p-3 text-left hover:cursor-pointer">
            <div className="flex-start flex gap-2">
              <div className="rounded-full bg-red-200 p-3">
                <LuSwords className="" size="25" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Violence and Gore</h3>
                <p className="text-text/90 text-sm">
                  Physical harm, bloodshed, torture, war violence, executions
                  and more.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded bg-red-100 px-2 py-1 text-sm font-bold text-red-400">
                Very Frequent
              </div>
              <p className="text-sm font-semibold">1,829 Votes</p>
            </div>
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel
              transition
              className="origin-top p-4 transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0"
            >
              <div className="mb-2 flex flex-col gap-2">
                <p className="text-sm font-bold">Specific Triggers</p>
              </div>

              <div className="text-text-muted mb-1 grid grid-cols-12 gap-4 px-3 text-xs">
                <p className="col-span-3 text-sm">Trigger</p>
                <p className="col-span-6 text-sm">Explanation</p>
                <p className="col-span-2 text-sm">Severity</p>
                <p className="col-span-1 text-right text-sm">Votes</p>
              </div>

              <Disclosure
                as="div"
                className="border-border w-full rounded-lg border"
              >
                <DisclosureButton className="border-border hover:bg-surface-alt bg-surface grid w-full grid-cols-12 items-center gap-4 rounded-lg border p-3 text-left hover:cursor-pointer">
                  <p className="col-span-3 text-sm">Character Death</p>
                  <p className="col-span-6 text-sm">
                    Main or Side Character die in battle and other violent
                    situations.
                  </p>
                  <p className="col-span-2 text-sm text-yellow-500">
                    Very Severe
                  </p>
                  <p className="col-span-1 text-right text-sm">1,756</p>
                </DisclosureButton>
                <DisclosurePanel className="bg-surface-alt/30 border-border rounded-b-lg border-t p-4">
                  <div className="mb-6 flex items-center gap-2 text-sm">
                    <p className="text-text font-bold">What do you think?</p>
                    <p className="text-text-muted">
                      Your vote helps keep warnings accurate.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-medium">
                        Did this trigger appear?
                      </p>
                      <div className="flex items-center gap-2">
                        <button className="border-accent-red text-accent-red hover:bg-accent-red/10 flex-1 rounded-lg border-2 px-3 py-1.5 text-sm font-semibold transition-colors hover:cursor-pointer">
                          Yes
                        </button>
                        <button className="border-primary text-primary hover:bg-primary/10 flex-1 rounded-lg border-2 px-3 py-1.5 text-sm font-semibold transition-colors hover:cursor-pointer">
                          No
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Severity (Custom Colors) */}
                    <div className="flex flex-col gap-3 md:col-span-2">
                      <p className="text-sm font-medium">How severe was it?</p>
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Mild Button */}
                        <button className="min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-mild) px-3 py-1.5 text-sm font-semibold text-(--color-severity-mild) transition-colors hover:cursor-pointer hover:bg-(--color-severity-mild)/10 md:flex-none">
                          Mild
                        </button>

                        {/* Moderate Button */}
                        <button className="min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-moderate) px-3 py-1.5 text-sm font-semibold text-(--color-severity-moderate) transition-colors hover:cursor-pointer hover:bg-(--color-severity-moderate)/10 md:flex-none">
                          Moderate
                        </button>

                        {/* Severe Button */}
                        <button className="min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-high) px-3 py-1.5 text-sm font-semibold text-(--color-severity-high) transition-colors hover:cursor-pointer hover:bg-(--color-severity-high)/10 md:flex-none">
                          Severe
                        </button>

                        {/* Very Severe Button */}
                        <button className="border-severity-severe text-severity-severe hover:bg-severity-severe/10 min-w-20 flex-1 rounded-lg border-2 px-3 py-1.5 text-sm font-semibold transition-colors hover:cursor-pointer md:flex-none">
                          Very Severe
                        </button>
                      </div>
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>

              <Disclosure
                as="div"
                className="border-border w-full rounded-lg border"
              >
                <DisclosureButton className="border-border hover:bg-surface-alt bg-surface grid w-full grid-cols-12 items-center gap-4 rounded-lg border p-3 text-left hover:cursor-pointer">
                  <p className="col-span-3 text-sm">Graphic Gore</p>
                  <p className="col-span-6 text-sm">
                    Detailed depictions of blood, organs, and severe bodily
                    injuries.
                  </p>
                  <p className="col-span-2 text-sm text-red-500">Severe</p>
                  <p className="col-span-1 text-right text-sm">1,756</p>
                </DisclosureButton>
                <DisclosurePanel className="bg-surface-alt/30 border-border rounded-b-lg border-t p-4">
                  <div className="mb-6 flex items-center gap-2 text-sm">
                    <p className="text-text font-bold">What do you think?</p>
                    <p className="text-text-muted">
                      Your vote helps keep warnings accurate.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-medium">
                        Did this trigger appear?
                      </p>
                      <div className="flex items-center gap-2">
                        <button className="border-accent-red text-accent-red hover:bg-accent-red/10 flex-1 rounded-lg border-2 px-3 py-1.5 text-sm font-semibold transition-colors hover:cursor-pointer">
                          Yes
                        </button>
                        <button className="border-primary text-primary hover:bg-primary/10 flex-1 rounded-lg border-2 px-3 py-1.5 text-sm font-semibold transition-colors hover:cursor-pointer">
                          No
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Severity (Custom Colors) */}
                    <div className="flex flex-col gap-3 md:col-span-2">
                      <p className="text-sm font-medium">How severe was it?</p>
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Mild Button */}
                        <button className="min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-mild) px-3 py-1.5 text-sm font-semibold text-(--color-severity-mild) transition-colors hover:cursor-pointer hover:bg-(--color-severity-mild)/10 md:flex-none">
                          Mild
                        </button>

                        {/* Moderate Button */}
                        <button className="min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-moderate) px-3 py-1.5 text-sm font-semibold text-(--color-severity-moderate) transition-colors hover:cursor-pointer hover:bg-(--color-severity-moderate)/10 md:flex-none">
                          Moderate
                        </button>

                        {/* Severe Button */}
                        <button className="min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-high) px-3 py-1.5 text-sm font-semibold text-(--color-severity-high) transition-colors hover:cursor-pointer hover:bg-(--color-severity-high)/10 md:flex-none">
                          Severe
                        </button>

                        {/* Very Severe Button */}
                        <button className="border-severity-severe text-severity-severe hover:bg-severity-severe/10 min-w-20 flex-1 rounded-lg border-2 px-3 py-1.5 text-sm font-semibold transition-colors hover:cursor-pointer md:flex-none">
                          Very Severe
                        </button>
                      </div>
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </DisclosurePanel>
          </div>
        </Disclosure>

        <Disclosure as="div" className="border-border w-full rounded-lg border">
          <DisclosureButton className="border-border hover:bg-surface-alt bg-surface flex w-full items-center justify-between gap-2 rounded-lg border p-3 text-left hover:cursor-pointer">
            <div className="flex-start flex gap-2">
              <div className="rounded-full bg-red-200 p-3">
                <LuSwords className="" size="25" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Violence and Gore</h3>
                <p className="text-text/90 text-sm">
                  Physical harm, bloodshed, torture, war violence, executions
                  and more.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded bg-red-100 px-2 py-1 text-sm font-bold text-red-400">
                Very Frequent
              </div>
              <p className="text-sm font-semibold">1,829 Votes</p>
            </div>
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel
              transition
              className="origin-top p-4 transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0"
            >
              <div className="mb-2 flex flex-col gap-2">
                <p className="text-sm font-bold">Specific Triggers</p>
              </div>

              <div className="text-text-muted mb-1 grid grid-cols-12 gap-4 px-3 text-xs">
                <p className="col-span-3 text-sm">Trigger</p>
                <p className="col-span-6 text-sm">Explanation</p>
                <p className="col-span-2 text-sm">Severity</p>
                <p className="col-span-1 text-right text-sm">Votes</p>
              </div>

              <Disclosure
                as="div"
                className="border-border w-full rounded-lg border"
              >
                <DisclosureButton className="border-border hover:bg-surface-alt bg-surface grid w-full grid-cols-12 items-center gap-4 rounded-lg border p-3 text-left hover:cursor-pointer">
                  <p className="col-span-3 text-sm">Character Death</p>
                  <p className="col-span-6 text-sm">
                    Main or Side Character die in battle and other violent
                    situations.
                  </p>
                  <p className="col-span-2 text-sm text-yellow-500">
                    Very Severe
                  </p>
                  <p className="col-span-1 text-right text-sm">1,756</p>
                </DisclosureButton>
                <DisclosurePanel className="bg-surface-alt/30 border-border rounded-b-lg border-t p-4">
                  <div className="mb-6 flex items-center gap-2 text-sm">
                    <p className="text-text font-bold">What do you think?</p>
                    <p className="text-text-muted">
                      Your vote helps keep warnings accurate.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-medium">
                        Did this trigger appear?
                      </p>
                      <div className="flex items-center gap-2">
                        <button className="border-accent-red text-accent-red hover:bg-accent-red/10 flex-1 rounded-lg border-2 px-3 py-1.5 text-sm font-semibold transition-colors hover:cursor-pointer">
                          Yes
                        </button>
                        <button className="border-primary text-primary hover:bg-primary/10 flex-1 rounded-lg border-2 px-3 py-1.5 text-sm font-semibold transition-colors hover:cursor-pointer">
                          No
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Severity (Custom Colors) */}
                    <div className="flex flex-col gap-3 md:col-span-2">
                      <p className="text-sm font-medium">How severe was it?</p>
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Mild Button */}
                        <button className="min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-mild) px-3 py-1.5 text-sm font-semibold text-(--color-severity-mild) transition-colors hover:cursor-pointer hover:bg-(--color-severity-mild)/10 md:flex-none">
                          Mild
                        </button>

                        {/* Moderate Button */}
                        <button className="min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-moderate) px-3 py-1.5 text-sm font-semibold text-(--color-severity-moderate) transition-colors hover:cursor-pointer hover:bg-(--color-severity-moderate)/10 md:flex-none">
                          Moderate
                        </button>

                        {/* Severe Button */}
                        <button className="min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-high) px-3 py-1.5 text-sm font-semibold text-(--color-severity-high) transition-colors hover:cursor-pointer hover:bg-(--color-severity-high)/10 md:flex-none">
                          Severe
                        </button>

                        {/* Very Severe Button */}
                        <button className="border-severity-severe text-severity-severe hover:bg-severity-severe/10 min-w-20 flex-1 rounded-lg border-2 px-3 py-1.5 text-sm font-semibold transition-colors hover:cursor-pointer md:flex-none">
                          Very Severe
                        </button>
                      </div>
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>

              <Disclosure
                as="div"
                className="border-border w-full rounded-lg border"
              >
                <DisclosureButton className="border-border hover:bg-surface-alt bg-surface grid w-full grid-cols-12 items-center gap-4 rounded-lg border p-3 text-left hover:cursor-pointer">
                  <p className="col-span-3 text-sm">Graphic Gore</p>
                  <p className="col-span-6 text-sm">
                    Detailed depictions of blood, organs, and severe bodily
                    injuries.
                  </p>
                  <p className="col-span-2 text-sm text-red-500">Severe</p>
                  <p className="col-span-1 text-right text-sm">1,756</p>
                </DisclosureButton>
                <DisclosurePanel className="bg-surface-alt/30 border-border rounded-b-lg border-t p-4">
                  <div className="mb-6 flex items-center gap-2 text-sm">
                    <p className="text-text font-bold">What do you think?</p>
                    <p className="text-text-muted">
                      Your vote helps keep warnings accurate.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-medium">
                        Did this trigger appear?
                      </p>
                      <div className="flex items-center gap-2">
                        <button className="border-accent-red text-accent-red hover:bg-accent-red/10 flex-1 rounded-lg border-2 px-3 py-1.5 text-sm font-semibold transition-colors hover:cursor-pointer">
                          Yes
                        </button>
                        <button className="border-primary text-primary hover:bg-primary/10 flex-1 rounded-lg border-2 px-3 py-1.5 text-sm font-semibold transition-colors hover:cursor-pointer">
                          No
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Severity (Custom Colors) */}
                    <div className="flex flex-col gap-3 md:col-span-2">
                      <p className="text-sm font-medium">How severe was it?</p>
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Mild Button */}
                        <button className="min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-mild) px-3 py-1.5 text-sm font-semibold text-(--color-severity-mild) transition-colors hover:cursor-pointer hover:bg-(--color-severity-mild)/10 md:flex-none">
                          Mild
                        </button>

                        {/* Moderate Button */}
                        <button className="min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-moderate) px-3 py-1.5 text-sm font-semibold text-(--color-severity-moderate) transition-colors hover:cursor-pointer hover:bg-(--color-severity-moderate)/10 md:flex-none">
                          Moderate
                        </button>

                        {/* Severe Button */}
                        <button className="min-w-20 flex-1 rounded-lg border-2 border-(--color-severity-high) px-3 py-1.5 text-sm font-semibold text-(--color-severity-high) transition-colors hover:cursor-pointer hover:bg-(--color-severity-high)/10 md:flex-none">
                          Severe
                        </button>

                        {/* Very Severe Button */}
                        <button className="border-severity-severe text-severity-severe hover:bg-severity-severe/10 min-w-20 flex-1 rounded-lg border-2 px-3 py-1.5 text-sm font-semibold transition-colors hover:cursor-pointer md:flex-none">
                          Very Severe
                        </button>
                      </div>
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </DisclosurePanel>
          </div>
        </Disclosure>
      </div>
    </div>
  );
};

export default TriggerWarning;
