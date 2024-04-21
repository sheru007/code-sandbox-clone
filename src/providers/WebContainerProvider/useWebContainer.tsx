import React from 'react';
import { WebContainerContext } from './WebContainerProvider';
 
export const useWebContainer = () => {
  const context = React.useContext(WebContainerContext);
 
  if (!context) {
    throw new Error(
      'useWebContainer must be used within a WebContainerProvider'
    );
  }
  return context;
};