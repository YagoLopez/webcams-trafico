import { Cam } from '@/architecture/domain/entities/cam';
import { CamNavigationService } from './cam-navigation-service';

describe('CamNavigationService', () => {
    const cam = (id: string, road: string, km: number, lat?: number, lon?: number): Cam => 
        new Cam(id, `url-${id}`, road, 'Dest', km, 'Loc', 'active', lat, lon);

    const roadA = 'A-1';
    const roadB = 'A-2';

    const cam1 = cam('1', roadA, 10, 40, -3);
    const cam2 = cam('2', roadA, 20, 41, -3);
    const cam3 = cam('3', roadA, 30, 42, -3);
    const cam4 = cam('4', roadB, 15, 40, -4);
    const camNoGps = cam('5', roadA, 25, undefined, undefined);

    const allCams = [cam1, cam2, cam3, cam4, camNoGps];

    describe('getNextCamOnRoad', () => {
        it('should return the next camera based on kilometer', () => {
            const next = CamNavigationService.getNextCamOnRoad(cam1, allCams);
            expect(next?.id).toBe('2');
        });

        it('should skip cameras without GPS', () => {
            // Entre cam2(20km) y cam3(30km) está camNoGps(25km) pero debería ser ignorada
            const next = CamNavigationService.getNextCamOnRoad(cam2, allCams);
            expect(next?.id).toBe('3');
        });

        it('should return null if it is the last camera on that road', () => {
            const next = CamNavigationService.getNextCamOnRoad(cam3, allCams);
            expect(next).toBeNull();
        });

        it('should ignore cameras on other roads', () => {
            // Cam4 está en roadB
            const next = CamNavigationService.getNextCamOnRoad(cam4, allCams);
            expect(next).toBeNull();
        });

        it('should handle road name normalization (case-insensitive and trim)', () => {
            const messyRoadCam = cam('6', ' a-1 ', 5, 39, -3);
            const next = CamNavigationService.getNextCamOnRoad(messyRoadCam, allCams);
            expect(next?.id).toBe('1');
        });
    });

    describe('getPrevCamOnRoad', () => {
        it('should return the previous camera based on kilometer', () => {
            const prev = CamNavigationService.getPrevCamOnRoad(cam3, allCams);
            expect(prev?.id).toBe('2');
        });

        it('should skip cameras without GPS', () => {
            // Entre cam3(30km) y cam2(20km) está camNoGps(25km) pero debería ser ignorada
            const prev = CamNavigationService.getPrevCamOnRoad(cam3, allCams);
            expect(prev?.id).toBe('2');
        });

        it('should return null if it is the first camera on that road', () => {
            const prev = CamNavigationService.getPrevCamOnRoad(cam1, allCams);
            expect(prev).toBeNull();
        });
    });
});
