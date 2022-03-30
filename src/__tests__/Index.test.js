// Import React
import React from 'react';

// Import Keycloak Provider
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from '../components/Keycloak';

// Import Testing Frameworks
import '@testing-library/jest-dom'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'

// Import Comp to Evaluate
import Workspace from '../views/Workspace';



  describe('Jest framework should', () =>{
    
    test('be able to run basic tests.', () => {
      expect(1).toBeTruthy();
    });

    test('be able to render a page with keycloak.', () => {
      render(
        <ReactKeycloakProvider authClient={keycloak}>
          <Workspace />
        </ReactKeycloakProvider>
      );
        expect(screen.getByTestId('HamburgerBtn')).toBeTruthy();
    });
  });