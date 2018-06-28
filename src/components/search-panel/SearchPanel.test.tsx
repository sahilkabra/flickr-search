import { mount, shallow } from 'enzyme';
import * as React from 'react';

import { SearchPanel } from './SearchPanel';

describe('SearchPanel', () => {
    it('displays an input field with search icon and 3 pages size radio options', () => {
        const wrapper = shallow(<SearchPanel />);

        expect(wrapper.find('input').length).toBe(4);
        expect(wrapper.find('span').prop('className')).toBe('fas fa-search');
    });
    it('changes the search icon to cross when text is passed', () => {
        const wrapper = shallow(<SearchPanel searchText="abc" />);
        expect(wrapper.find('span').prop('className')).toBe('fas fa-times');
    });
    it('calls search action when the input changes', () => {
        const search = jest.fn();
        const mockActions = {
            search,
            setPageSize: jest.fn(),
        };

        const wrapper = mount(<SearchPanel actions={mockActions} />);

        wrapper
            .find('input')
            .first()
            .simulate('change', { target: { value: 'abc' } });
        expect(search).toHaveBeenCalledWith('abc', 2);
        expect(wrapper.find('span').prop('className')).toBe('fas fa-times');
    });
    it('calls search action when the radio input changes', () => {
        const search = jest.fn();
        const setPageSize = jest.fn();
        const mockActions = {
            search,
            setPageSize,
        };

        const wrapper = mount(
            <SearchPanel searchText="abc" actions={mockActions} />
        );

        wrapper
            .find('input')
            .at(2)
            .simulate('change');
        expect(setPageSize).toHaveBeenCalledWith(10);
        expect(search).toHaveBeenCalledWith('abc', 10);
    });
});
