import axios from 'axios';
import { GET } from '@/app/api/get-remote-cams-data+api';

// Properly type Axios mock
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
  mkdirSync: jest.fn(),
  promises: {
    writeFile: jest.fn().mockResolvedValue(undefined),
  },
}));

describe('GET /get-remote-cams-data', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should parse valid DGT XML and return transformed WebcamData array', async () => {
    const validXML = `
      <d2:payload xmlns:d2="http://datex2.eu/schema/2/2/0">
        <d2:device id="1001">
          <d2:deviceUrl>http://example.com/cam1.jpg</d2:deviceUrl>
          <d2:pointLocation>
            <d2:supplementaryPositionalDescription>
              <d2:roadInformation>
                <d2:roadName>A-6</d2:roadName>
                <d2:roadDestination>Madrid</d2:roadDestination>
              </d2:roadInformation>
            </d2:supplementaryPositionalDescription>
            <d2:tpegPointLocation>
              <d2:point>
                <d2:tpegNonJunctionPointExtension>
                  <d2:extendedTpegNonJunctionPoint>
                    <d2:kilometerPoint>12.5</d2:kilometerPoint>
                    <d2:province>Madrid</d2:province>
                  </d2:extendedTpegNonJunctionPoint>
                </d2:tpegNonJunctionPointExtension>
              </d2:point>
            </d2:tpegPointLocation>
          </d2:pointLocation>
        </d2:device>
      </d2:payload>
    `;

    mockedAxios.get.mockResolvedValueOnce({ data: validXML });

    const request = new Request('http://localhost/test');
    const response = await GET(request);

    expect(response.status).toBe(200);
    const data = await response.json();

    expect(data).toHaveLength(1);
    expect(data[0]).toEqual({
      id: "1001",
      imageUrl: "http://example.com/cam1.jpg",
      road: "A-6",
      kilometer: "Pk 12.5 - Madrid",
      location: "Madrid",
      status: "active"
    });
  });

  it('should handle XML with missing payload element', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: '<invalid></invalid>' });

    const request = new Request('http://localhost/test');
    const response = await GET(request);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toBe('Invalid XML structure: missing payload root');
  });

  it('should handle network errors correctly', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network failure'));

    const request = new Request('http://localhost/test');
    const response = await GET(request);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toBe('Internal Server Error');
  });
});
