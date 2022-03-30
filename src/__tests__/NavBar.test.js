// Import React
import React from 'react';

// Import Keycloak Provider
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from '../components/Keycloak';

// Import Testing Frameworks
import '@testing-library/jest-dom'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'

// Import Comp to Evaluate
import NavBar from '../components/NavBar.js'



  describe(`The Workspace's navbar should`, () =>{
    beforeEach(() => {
        render(
            <ReactKeycloakProvider authClient={keycloak}>
              <NavBar />
            </ReactKeycloakProvider>
          );
    });

    test('contain all elements in a navbar', () => {

        expect(screen.getByTestId('NavBar')).toBeTruthy();

    });

    test('contain a hambrger button.', () => {

        expect(screen.getByTestId('HamburgerBtn')).toBeTruthy();

    });

    test('contain a hambrger button.', () => {

        expect(screen.getByTestId('UserProfileBtn')).toBeTruthy();

    });

    xtest('contain a search input bar.', () => {

        expect(screen.getByTestId('SearchInput')).toBeTruthy();

    });



  });