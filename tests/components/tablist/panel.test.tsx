import React from "react";
import { render } from "@testing-library/react";
import Panel from "@/components/tablist/panel";

describe("Panel", () => {
  it("renders children inside the panel", () => {
    const { getByRole } = render(
      <Panel id="alpha">
        <span data-testid="child">Hello</span>
      </Panel>
    );
    const panel = getByRole("tabpanel");
    expect(panel).toBeTruthy();
    expect(panel.querySelector('[data-testid="child"]')?.textContent).toBe("Hello");
  });

  it("applies correct id, role, aria-labelledby, and default tabIndex", () => {
    const { getByRole } = render(<Panel id="xyz">content</Panel>);
    const panel = getByRole("tabpanel") as HTMLDivElement;
    expect(panel.id).toBe("panel-xyz");
    expect(panel.getAttribute("aria-labelledby")).toBe("tab-xyz");
    expect(panel.getAttribute("role")).toBe("tabpanel");
    expect(panel.tabIndex).toBe(-1);
  });

  it("merges custom className with base class", () => {
    const { getByRole } = render(
      <Panel id="beta" className="extra-class another">content</Panel>
    );
    const panel = getByRole("tabpanel") as HTMLDivElement;
    const classes = (panel.getAttribute("class") || "").split(/\s+/);
    expect(classes).toContain("tablist__content-panel");
    expect(classes).toContain("extra-class");
    expect(classes).toContain("another");
  });

  it("spreads arbitrary props onto the root div", () => {
    const { getByRole } = render(
      <Panel id="spread" data-foo="bar" aria-hidden="true" style={{ outline: "1px solid red" }}>
        spread
      </Panel>
    );
    const panel = getByRole("tabpanel", {hidden: true}) as HTMLDivElement;
    expect(panel.getAttribute("data-foo")).toBe("bar");
    expect(panel.getAttribute("aria-hidden")).toBe("true");
    expect(panel.style.outline).toBe("1px solid red");
  });

  it("handles numeric-like id values (coerced to string)", () => {
    const { container } = render(<Panel id={"0" as any}>content</Panel>);
    const el = container.querySelector("#panel-0") as HTMLDivElement;
    expect(el).toBeTruthy();
    expect(el.getAttribute("aria-labelledby")).toBe("tab-0");
  });
});