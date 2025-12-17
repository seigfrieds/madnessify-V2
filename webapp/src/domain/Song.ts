export type Song_Id = string;
export type Song_Title = string;
export type Song_MainArtistName = string;
export type Song_ImageUrl = string;

export interface Song {
  id: Song_Id;
  title: Song_Title;
  mainArtistName: Song_MainArtistName;
  imageUrl: Song_ImageUrl;
}
