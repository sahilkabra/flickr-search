import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from '../../actions';
import './SearchPanel.css';

const SearchResults = ({ title, url }: any) => (
    <div className="col-sm">
        <div className="search-panel__results__title">{title}</div>
        <img className="search-panel__results__img" src={url} alt={title} />
    </div>
);

export type SearchPanelProps = {
    actions?: typeof Actions;
    pageSize?: number;
    searchText?: string;
    searchResults?: any[];
    onChange?: (input: string) => void;
    isLoading?: boolean;
};
export type SearchPanelState = {
    searchText?: string;
};

export const pageSizes = [2, 10, 30];

export class SearchPanel extends React.Component<
    SearchPanelProps,
    SearchPanelState
> {
    constructor(props: SearchPanelProps) {
        super(props);
        this.state = {
            searchText: props.searchText || '',
        };
    }

    public componentWillReceiveProps(nextProps: SearchPanelProps) {
        if (nextProps.searchText !== this.props.searchText) {
            this.setState({ searchText: nextProps.searchText });
        }
    }

    public render() {
        const searchIcon = this.state.searchText
            ? this.props.isLoading
                ? 'fas fa-spinner'
                : 'fas fa-times'
            : 'fas fa-search';
        return (
            <React.Fragment>
                <form
                    action="."
                    className="row text-center"
                    onSubmit={this.handleSubmit}
                    role="search"
                >
                    <div className="col-md-12 col-xs-12 container search-panel__group">
                        <div className="row">
                            <input
                                onChange={this.handleChange}
                                placeholder="Search by city, e.g. sydney"
                                type="search"
                                className="col-xs-10 col-md-10 search-panel__input"
                                value={this.state.searchText}
                            />
                            <span
                                className={searchIcon}
                                onClick={() => this.handleClear()}
                            />
                        </div>
                        <div className="row search-panel__pages">
                            {pageSizes.map(s => (
                                <label key={s}>
                                    <input
                                        type="radio"
                                        value={`${s}`}
                                        name="pages"
                                        onChange={() => this.handlePageSize(s)}
                                        checked={this.props.pageSize === s}
                                    />
                                    {`${s}`}
                                </label>
                            ))}
                        </div>
                    </div>
                </form>
                <div className="row container-fluid">
                    <div className="col-md-10 col-xs-10 row search-panel__results">
                        {this.props.searchResults &&
                            this.props.searchResults.map(r => (
                                <SearchResults key={r.id} {...r} />
                            ))}
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private handleClear = () => {
        this.setState({ searchText: '' });
    };

    private handleChange = (e: React.ChangeEvent<any>) => {
        const searchText = e.target.value;
        this.setState(
            { searchText },
            () =>
                this.props.actions &&
                this.props.actions.search(searchText, this.props.pageSize || 2)
        );
    };

    private handlePageSize = (size: number) => {
        if (this.props.actions) {
            this.props.actions.setPageSize(size);
            if (this.state.searchText) {
                this.props.actions.search(this.state.searchText, size);
            }
        }
    };

    private handleSubmit = (e: React.FormEvent<any>) => {
        e.preventDefault();
        const searchInput = document.querySelector(
            '.search-input'
        ) as HTMLElement;
        searchInput.blur();
    };
}

export const ConnectedSearchPanel = connect(
    (state: any) => {
        return state.data;
    },
    (dispatch: any) => ({
        actions: bindActionCreators(Actions, dispatch),
    })
)(SearchPanel);
