// Import React
import React from 'react';

// Import Keycloak Provider
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from '../components/Keycloak';

// Import Testing Frameworks
import '@testing-library/jest-dom'
import {render, fireEvent, waitFor, screen, getByTestId, prettyDOM} from '@testing-library/react'

// Import Comp to Evaluate
import SideBar from '../components/SideBar.js';
import Drawer from "@material-ui/core/Drawer";
import Workspace from '../views/Workspace.js';

// Import WorkspaceContext
import WorkspaceContext from "../context/WorkspaceContext";
import { ExpansionPanelActions } from '@material-ui/core';

  // const testContextObj = { selectedSideView, setSelectedSideView, selectedNode, selectedLink }

  describe(`The Workspace's sidebar should`, () =>{
    beforeEach(() => {
      const {container, getByText} = render(
            <ReactKeycloakProvider authClient={keycloak}>
              {/* <WorkspaceContext.Provider value={testContextObj}> */}
                <Workspace />
              {/* </WorkspaceContext.Provider> */}
            </ReactKeycloakProvider>
          );
    });

    // test('contain all elements in a navbar', () => {
    //     // expect(screen.getByText('CSV Import')).toBeTruthy();
    //     expect(1).toBe(1);
    //     console.log(prettyDOM(Workspace))
    // });
    xtest('should break, so we can view the render.', () => {
      expect(screen.getByText('Hello, world!')).toBeInTheDocument()
    })

    test('have a drawer', () => {
      expect(screen.getByTestId('SideBarDrawer')).toBeTruthy();
    });

  });