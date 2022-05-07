import apps from '../apps';
import { Tracking } from '../Tracking'
import { ITracking } from '../types';

describe(Tracking.name, () => {

  let tracker: ITracking = new Tracking('mobile')
  describe('constructor', () => {
    it('should throw an error if appName does not exist', () => {
      // @ts-expect-error
      expect(() => new Tracking('no-existing-app')).toThrowError()
    });
    
    it('should set this.siteId that matched the appName', () => {
      tracker = new Tracking('mobile')

      expect(tracker.siteId).toEqual(apps.mobile)
    });
    
    // @TODO:
    describe('this.isEnabled', () => {
      it.todo('should set this.isEnabled to false');

      it.todo('should set this.isEnabled to true');
    });
  });

  describe('identify', () => {
    it('should set this.user', () => {
      tracker.identify({id: '1', email: 'testing@paralenz.com'})

      expect(tracker.user).toEqual({id: '1', email: 'testing@paralenz.com'})
    });
  });

  // @TODO:
  describe('trackEvent', () => {
    it.todo('throw an error if no sideId is set');
    
    describe('isEnabled', () => {
    
      describe('false', () => {
        it.todo('it should not invoke tracker.track');
      });

      describe('true', () => {
        it.todo('it should invoke tracker.track');
      });
    });
  });

  describe('enableDebugging', () => {
    it('should set this.debug enabled', () => {
      expect(tracker.enableDebugging(true)).toBe(true)
      expect(tracker.debugEnabled).toBe(true)
    });
    it('should set this.debug disable', () => {
      expect(tracker.enableDebugging(false)).toBe(false)
      expect(tracker.debugEnabled).toBe(false)
    });
  });


  // @TODO:
  describe('optOutOfTracking', () => {
    describe('disable', () => {
      it.todo('should invoke storageProvider.setItem with false');
      
      it.todo('should set this.isEnabled to false');

      it.todo('should return false');
    });

    describe('enable', () => {
      it.todo('should  invoke storageProvider.setItem with false');
      
      it.todo('should set this.isEnabled to true');

      it.todo('should return false');
    });
  });
});