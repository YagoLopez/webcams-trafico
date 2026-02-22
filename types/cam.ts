export class Cam {
  constructor(
    public id: string,
    public imageUrl: string,
    public road: string,
    public kilometer: string,
    public location: string,
    public status: 'active' | 'offline' = 'active',
    public latitude?: number,
    public longitude?: number
  ) { }
}

