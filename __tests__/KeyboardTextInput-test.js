import React from 'react';
import KeyboardTextInput from '../src/KeyboardTextInput';

import renderer from 'react-test-renderer';

let onClose = jest.fn();

describe('>>> KeyboardTextInput --- Test rendering component', () => {
    it('should render correctly', () => {
        const tree = renderer.create(
            <KeyboardTextInput 
                onClose={onClose}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
