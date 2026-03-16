export class Cam {
  constructor(
    public id: string,
    public imageUrl: string,
    public roadName: string,
    public roadDestination: string,
    public kilometer: number,
    public location: string,
    public status: 'active' | 'offline' = 'active',
    public latitude?: number,
    public longitude?: number
  ) { }
}
