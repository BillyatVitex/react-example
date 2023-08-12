import React from "react";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import Link from "next/link";

export default function SideMenu() {
  return (
    <SidebarMenu bg="light" expand="lg" hide="md">
      <SidebarMenu.Collapse >
        <SidebarMenu.Header>

          {/* <SidebarMenu.Toggle /> */}
        </SidebarMenu.Header>
        <SidebarMenu.Body>
          <SidebarMenu.Nav>

            <SidebarMenu.Nav.Item>
              <SidebarMenu.Nav.Icon>1</SidebarMenu.Nav.Icon>
              <Link href="reacting-to-input-with-state">
                Reacting to Input with State
              </Link>
            </SidebarMenu.Nav.Item>

            <SidebarMenu.Nav.Item>
              <SidebarMenu.Nav.Icon>2</SidebarMenu.Nav.Icon>
              <Link href="choosing-the-state-structure">
                Choosing the State Structure
              </Link>
            </SidebarMenu.Nav.Item>

            <SidebarMenu.Nav.Item>
              <SidebarMenu.Nav.Icon>3</SidebarMenu.Nav.Icon>

              <Link href="sharing-state-between-components">
                Sharing State Between Components
              </Link>
            </SidebarMenu.Nav.Item>

            <SidebarMenu.Nav.Item>
              <SidebarMenu.Nav.Icon>4</SidebarMenu.Nav.Icon>

              <Link href="preserving-and-resetting-state">
                Preserving and Resetting State
              </Link>
            </SidebarMenu.Nav.Item>

            <SidebarMenu.Nav.Item>
              <SidebarMenu.Nav.Icon>5</SidebarMenu.Nav.Icon>

              <Link href="extracting-state-logic-into-a-reducer">
                Extracting State Logic into a Reducer
              </Link>
            </SidebarMenu.Nav.Item>

            <SidebarMenu.Nav.Item>
              <SidebarMenu.Nav.Icon>6</SidebarMenu.Nav.Icon>

              <Link href="passing-data-deeply-with-context">
                Passing Data Deeply with Context
              </Link>
            </SidebarMenu.Nav.Item>


            <SidebarMenu.Nav.Item>
              <SidebarMenu.Nav.Icon>7</SidebarMenu.Nav.Icon>

              <Link href="scaling-up-with-reducer-and-context">
                Scaling Up with Reducer and Context
              </Link>
            </SidebarMenu.Nav.Item>
          </SidebarMenu.Nav>

        </SidebarMenu.Body>
      </SidebarMenu.Collapse>
    </SidebarMenu>
  )
}