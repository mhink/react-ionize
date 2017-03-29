// @flow

import React from 'react';
import { Ionize } from 'ionize';
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
