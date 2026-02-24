import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';

export function CustomDrawerContent(props: any) {

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
