// @flow

import React from 'react';
import Ionize from 'react-ionize';
import {
  app,
  ElectronTestUtils,
  Menu
} from 'electron';

describe('<menu />', function() {
  beforeEach(() => {
    Ionize.reset();
    ElectronTestUtils.reset();
    app.test_makeReady();
    sinon.stub(Menu, 'setApplicationMenu');
  });

  afterEach(() => {
    Menu.setApplicationMenu.restore();
  });

  it('should only call Menu.setApplicationMenu with the root menu', function(done) {
    const rootMenu = ElectronTestUtils.getMenu(1);

    Ionize.start(
      <menu>
        <menu />
      </menu>,
      () => {
        expect(Menu.setApplicationMenu).to.have.been.calledOnce;
        expect(Menu.setApplicationMenu).to.have.been.calledWith(rootMenu);
        done();
      }
    );
  });

  it('should be possible to add/remove items from a submenu', function(done) {
    let subMenu;

    Ionize.chain(
      <menu>
        <menu ref={c => { subMenu = c;}}>
          <item label="One" />
        </menu>
      </menu>,
      () => {
        expect(subMenu.flush())
        .to.deep.equal({
          submenu: {
            items: [
              { label: 'One' }
            ]
          },
        });
      },
      <menu>
        <menu ref={c => { subMenu = c;}}>
          <item label="One" />
          <item label="Two" />
        </menu>
      </menu>,
      () => {
        expect(subMenu.flush())
        .to.deep.equal({
          submenu: {
            items: [
              { label: 'One' },
              { label: 'Two' }
            ]
          }
        });
      },
      <menu>
        <menu ref={c => { subMenu = c;}}>
          <item key="One" label="One" />
        </menu>
      </menu>,
      () => {
        expect(subMenu.flush())
        .to.deep.equal({
          submenu: {
            items: [
              { label: 'One' },
            ]
          }
        });
        done();
      }
    );

  });

  it('should be possible to remove an item from the menu', function(done) {
    let rootMenu;

    Ionize.chain(
      <menu ref={c => { rootMenu = c;}}>
        <item label="One" />
        <item label="Two" />
      </menu>,
      () => {
        expect(rootMenu.flush())
        .to.deep.equal({
          items: [
            { label: 'One' },
            { label: 'Two' }
          ]
        });
      },
      <menu ref={c => { rootMenu = c;}}>
        <item label="One" />
      </menu>,
      () => {
        expect(rootMenu.flush())
        .to.deep.equal({
          items: [
            { label: 'One' },
          ]
        });
        done();
      }
    );
  });


  it('should call rootMenu.append with a MenuItem built from the submenu', function(done) {
    let rootMenu;

    Ionize.start(
      <menu ref={c => { rootMenu = c; }}>
        <menu label="Magic">
          <item label="One" />
          <menu label="More Magic">
            <item label="Two" />
          </menu>
        </menu>
      </menu>,
      () => {
        expect(rootMenu.flush())
        .to.deep.equal({
          items: [
            { label: 'Magic',
              submenu: {
                items: [
                  { label: 'One' },
                  { label: 'More Magic',
                    submenu: {
                      items: [
                        { label: 'Two' }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        });
        done();
      }
    );
  });

});
