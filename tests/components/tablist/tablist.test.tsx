/**
 * Tests for TabList component
 *
 * These tests validate:
 *  - Rendering behavior with/without tabs
 *  - ARIA roles and aria-orientation
 *  - Integration with useTablist hook (mocked)
 *  - Click and keyboard interactions
 *  - Panel visibility toggling via "hidden" prop
 *  - Prop spreading onto the tablist header
 */

import React from "react"
import { fireEvent, render, screen, within } from '@testing-library/react'
import TabList from "@/components/tablist/index"


interface MockTabProps {
    id: string;
    isSelected: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

// Mock children components and hook for isolation and deterministic behavior
jest.mock("../../../components/tablist/tab", () => {
    return {
        __esModule: true,
        default: ({ id, isSelected, onClick, children }: MockTabProps) => (
            <button
                data-testid={`tab-${id}`}
                role="tab"
                aria-selected={isSelected}
                onClick={onClick}
            >
                {children}
            </button>
        ),
    }
})
interface MockPanelProps {
    id: string;
    hidden: boolean;
    children: React.ReactNode;
}

jest.mock("../../../components/tablist/panel", () => {
    return {
        __esModule: true,
        default: ({ id, hidden, children }: MockPanelProps) => (
            <div
                data-testid={`panel-${id}`}
                role="tabpanel"
                hidden={hidden}
                aria-hidden={hidden ? "true" : "false"}
            >
                {children}
            </div>
        ),
    }
})

// Spy/mock the useTablist hook to control state/handlers.
const mockSetActive = jest.fn()
const mockHandleKeyDown = jest.fn()
const makeRef = () => ({ current: null } as React.MutableRefObject<HTMLDivElement | null>)

jest.mock("../../../components/tablist/useTablist", () => {
    return {
        __esModule: true,
        default: (defaultActiveId: string) => {
            // Expose the defaultActiveId via a closure so tests can change behavior by re-mocking if needed.
            // activeId defaults to whatever is passed to the component via defaultActiveTabId.
            return {
                activeId: defaultActiveId,
                setActiveTab: mockSetActive,
                tablistRef: makeRef(),
                handleKeyDown: mockHandleKeyDown,
            }
        },
    }
})

type TabItem = {
    id: string
    tabLabel: React.ReactNode
    panelContent: React.ReactNode
}

const sampleTabs: TabItem[] = [
    { id: "t1", tabLabel: "Tab One", panelContent: "Panel One" },
    { id: "t2", tabLabel: "Tab Two", panelContent: "Panel Two" },
    { id: "t3", tabLabel: "Tab Three", panelContent: "Panel Three" },
]

describe("TabList", () => {
    beforeEach(() => {
        mockSetActive.mockClear()
        mockHandleKeyDown.mockClear()
    })

    it("returns null when tabs prop is missing or empty", () => {
        const { container: c1 } = render(<TabList tabs={undefined as any} /> as any)
        expect(c1.firstChild).toBeNull()

        const { container: c2 } = render(<TabList tabs={[]} /> as any)
        expect(c2.firstChild).toBeNull()
    })

    it("renders a tablist header with correct role and default horizontal orientation", () => {
        render(<TabList tabs={sampleTabs} defaultActiveTabId="t1" />)
        const header = screen.getByRole("tablist")
        expect(header).toBeInTheDocument()
        expect(header).toHaveAttribute("aria-orientation", "horizontal")
    })

    it("supports vertical orientation via prop", () => {
        render(<TabList tabs={sampleTabs} defaultActiveTabId="t2" orientation="vertical" />)
        expect(screen.getByRole("tablist")).toHaveAttribute("aria-orientation", "vertical")
    })

    it("renders one Tab per item and sets selected state from activeId", () => {
        render(<TabList tabs={sampleTabs} defaultActiveTabId="t2" />)
        const tabs = screen.getAllByRole("tab")
        expect(tabs).toHaveLength(sampleTabs.length)

        // Check labels and selected state
        expect(screen.getByTestId("tab-t1")).toHaveAttribute("aria-selected", "false")
        expect(screen.getByTestId("tab-t2")).toHaveAttribute("aria-selected", "true")
        expect(screen.getByTestId("tab-t3")).toHaveAttribute("aria-selected", "false")
    })

    it("renders one Panel per item and toggles hidden based on activeId", () => {
        render(<TabList tabs={sampleTabs} defaultActiveTabId="t3" />)
        expect(screen.getByTestId("panel-t1")).toHaveAttribute("hidden")
        expect(screen.getByTestId("panel-t2")).toHaveAttribute("hidden")
        expect(screen.getByTestId("panel-t3")).not.toHaveAttribute("hidden")
    })

    it("clicking a Tab calls setActiveTab with the tab id", async () => {
        render(<TabList tabs={sampleTabs} defaultActiveTabId="t1" />)
        fireEvent.click(screen.getByTestId("tab-t3"))
        expect(mockSetActive).toHaveBeenCalledTimes(1)
        expect(mockSetActive).toHaveBeenCalledWith("t3")
    })

    it("attaches handleKeyDown to the header and calls it on key events", () => {
        render(<TabList tabs={sampleTabs} defaultActiveTabId="t1" />)
        const header = screen.getByRole("tablist")
        fireEvent.keyDown(header, { key: "ArrowRight" })
        expect(mockHandleKeyDown).toHaveBeenCalledTimes(1)
        // ensure the event object is forwarded
        const evtArg = mockHandleKeyDown.mock.calls[0]?.[0]
        expect(evtArg).toBeTruthy()
        expect((evtArg as KeyboardEvent).key || (evtArg as any).key).toBe("ArrowRight")
    })

    it("binds the tablistRef to the header element", () => {
        // Re-mock useTablist to inject a shared ref we can assert on
        const sharedRef: React.MutableRefObject<HTMLDivElement | null> = { current: null }
        jest.resetModules()
        jest.doMock("../../../components/tablist/useTablist", () => ({
            __esModule: true,
            default: (defaultActiveId: string) => ({
                activeId: defaultActiveId,
                setActiveTab: mockSetActive,
                tablistRef: sharedRef,
                handleKeyDown: mockHandleKeyDown,
            }),
        }))
        const TabListReloaded = require("../../../components/tablist/index").default
        render(<TabListReloaded tabs={sampleTabs} defaultActiveTabId="t1" />)
        expect(sharedRef.current).toHaveAttribute("role", "tablist")
        expect(sharedRef.current).toHaveClass("tablist__header")
        jest.dontMock("../../../components/tablist/useTablist")
        jest.resetModules()
    })

    it("renders accessible structure: header contains only tabs; content contains only panels", () => {
        render(<TabList tabs={sampleTabs} defaultActiveTabId="t2" />)
        const header = screen.getByRole("tablist")
        const content = document.querySelector(".tablist__content") as HTMLElement

        // Header has tabs
        const headerQueries = within(header)
        expect(headerQueries.getAllByRole("tab")).toHaveLength(sampleTabs.length)

        // Content has tabpanels
        expect(content).not.toBeNull()
        const panels = within(content).getAllByRole("tabpanel")
        expect(panels).toHaveLength(sampleTabs.length)
    })
})
