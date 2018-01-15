import React from 'react';
import KeyboardTextInput from '../src/KeyboardTextInput';

import renderer from 'react-test-renderer';

describe('>>> KeyboardTextInput --- Test rendering component', () => {
    it('should render correctly', () => {
        const tree = renderer.create(
            <KeyboardTextInput />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
