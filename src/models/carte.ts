export class Carte {

    _id: string
    detailedInformation: {
      latitude: number,
      longitude: number,
      coordinates: Array<number>
      name: string,
      priceRange: number,
      useCase: Array<string>
    }
    providersData:
      Array<{
        elementName: string,
        elementId: string,
        providerName: string,
        copyrightImageSrc: string,
        useCase: Array<string>
        lastUpdate: number
      }>
    associatedElementQualificationEntry: string
    brainScoring: {
      elementId: string,
      searchId: string,
      userId: string,
      requestQuery: string,
      userScoring: number
      requestScoring: number
      searchScoring: number
      action: string
    }
}
