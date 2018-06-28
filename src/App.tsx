import * as React from 'react';

import './App.css';

import { ConnectedSearchPanel as SearchPanel } from './components';

class App extends React.Component {
    public render() {
        return (
            <div className="app container">
                <header className="row mx-auto text-center app-header">
                    <h1 className="col-xs-12 col-md-12 app-title">
                        Search for flickr photos!
                    </h1>
                </header>
                <SearchPanel />
            </div>
        );
    }
}

export default App;
