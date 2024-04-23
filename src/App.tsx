import './App.css'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import CodeEditor from './components/CodeEditor';
import WebContainerProvider from './providers/WebContainerProvider';
import { VITE_REACT_TEMPLATE } from './templates/react-vite';
import Terminal from './components/Terminal';
import Preview from './components/Preview';

//  TODO: 
// TODO: 
export default function App() {
  return (
    <WebContainerProvider template={VITE_REACT_TEMPLATE}>
    <div className='h-dvh p-2'>
    <PanelGroup direction='horizontal'>
      <Panel>
        <PanelGroup direction='vertical'>
          <Panel>
            <div className='h-full border bg-red-100'>
              <CodeEditor />
            </div>
          </Panel>
          <PanelResizeHandle className='h-2 bg-blue-300' />
          <Panel>
            <div className='h-full border bg-red-100'>
              <Terminal />
            </div>
          </Panel>
        </PanelGroup>
      </Panel>
      <PanelResizeHandle className='w-2 bg-blue-300' />
      <Panel>
        <div className='h-full border bg-red-100'>
          <Preview />
        </div>
      </Panel>
    </PanelGroup>
    </div>
    </WebContainerProvider>
  );
}