import React from 'react';
import { Ionize, IonizeRenderer } from 'ionize';
import {
  app,
  ElectronTestUtils
} from 'electron';

describe('<window />', function() {
  let windowRef;
  const captureRef = { ref: c => { windowRef = c; }}

  beforeEach(() => {
    Ionize.reset();
    ElectronTestUtils.reset();
    app.test_makeReady();
  });

  describe('props', function() {
    describe('show', function() {
      context('during the initial mount', function() {
        context('when true', function() {
          it('the window should immediately become visible', function(done) {
            Ionize.start(
              <window show { ...captureRef} />,
              () => {
                expect(windowRef._visible).to.be.true;
                done();
              }
            );
          });
        });

        context('when false', function() {
          it('the window should NOT become visible', function(done) {
            Ionize.start(
              <window {...captureRef} />,
              () => {
                expect(windowRef._visible).to.be.false;
                done();
              }
            );
          });
        });

        context('when an updated is committed', () => {
          context('when it transitions from FALSE to TRUE', function() {
            it('should cause the window to become visible', function(done) {
              Ionize.chain(
                <window show={false} {...captureRef} />, 
                () => expect(windowRef._visible).to.be.false,

                <window show={true} {...captureRef} />,
                () => {
                  expect(windowRef._visible).to.be.true,
                  done();
                }
              );
            })
          });

          context('when it transitions from TRUE to FALSE', function() {
            it('should cause the window to become hidden', function(done) {
              Ionize.chain(
                <window show={true} {...captureRef} />, 
                () => expect(windowRef._visible).to.be.true,

                <window show={false} {...captureRef} />,
                () => {
                  expect(windowRef._visible).to.be.false,
                  done();
                }
              );
            })
          });
        });
      });
    });
  });
});
