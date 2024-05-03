export interface GooglePhoto {
    photo_reference: string
    html_attributions: any[]
    height: number
    width: number
}

export interface GoogleCandidate {
    name: string
    address: string
    icon: string
    photos: GooglePhoto[]
}