import { LuBookmark, LuMinus, LuPlus, LuShare2 } from "react-icons/lu";

import { useImageProxy } from "../../utils/image-proxy";
import Comment from "./Comment";
import { MetaInfo } from "./MetaInfo";
import React, { useState } from "react";
import ModalDialog from "../UI/ModalDialog";
import { useForm } from "@inertiajs/react";
import { SelectOption } from "../UI/SelectOption";

interface MainInfoProps {
  anime: App.DTOs.AnimeData;
}

export interface WatchlistFormData {
  animeId: string;
  userId: string;
  status: string;
  progress: string;
  score: string;
  note: string;
}

const MainInfo = ({ anime }: MainInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { proxyImage } = useImageProxy();
  const coverImage = proxyImage(
    anime.images?.webp?.image_url || anime.images?.jpg?.image_url,
  );

  const displayTitle =
    anime.titles?.find((t) => t.type === "English")?.title ||
    anime.titles?.[0]?.title;

  const originalTitle =
    anime.titles?.find((t) => t.type === "Default")?.title ||
    anime.titles?.[0]?.title;

  const airedSeason =
    anime.season && anime.year
      ? `${anime.season.charAt(0).toUpperCase() + anime.season.slice(1)} ${anime.year}`
      : anime.year
        ? anime.year.toString()
        : null;

  const metadata = (
    <>
      <MetaInfo label="Status" value={anime.status} />
      <MetaInfo label="Source" value={anime.source} />
      <MetaInfo label="Aired" value={airedSeason} />
      <MetaInfo label="Rating" value={anime.rating} />
      <MetaInfo label="Duration" value={anime.duration} />
      <MetaInfo label="Studio" items={anime.studios} />
      <MetaInfo label="Producers" items={anime.producers} />
      <MetaInfo label="Themes" items={anime.themes} />
      <MetaInfo label="Demographics" items={anime.demographics} />
    </>
  );

  const { data, setData, post, processing, errors } =
    useForm<WatchlistFormData>({
      animeId: "",
      userId: "",
      status: "",
      progress: "",
      score: "",
      note: "",
    });

  const onSubmitWatchlist = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("a");
  };

  const statusSelectItem = [
    {
      value: "planned",
      label: "Planned",
    },
    {
      value: "watching",
      label: "Watching",
    },
    {
      value: "completed",
      label: "Completed",
    },
    {
      value: "on_hold",
      label: "On hold",
    },
    {
      value: "dropped",
      label: "Dropped",
    },
  ];

  return (
    <div className="min-w-0 lg:col-span-3">
      {/* MOBILE COVER */}
      <div className="mb-5 flex justify-center md:hidden">
        <img
          src={coverImage}
          alt="cover anime image"
          className="bg-surface aspect-3/4 w-full max-w-60 rounded-xl object-cover shadow-sm"
        />
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden w-56 shrink-0 md:block">
          <img
            src={coverImage}
            alt="cover anime image"
            className="bg-surface aspect-3/4 w-full rounded-xl object-cover shadow-sm"
          />

          <div className="border-border mt-4 border-t">{metadata}</div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex min-w-0 flex-1 flex-col">
          <h1 className="text-text text-2xl leading-tight font-bold lg:text-4xl">
            {displayTitle}
          </h1>

          <p className="text-primary mb-3 text-sm font-semibold lg:text-lg">
            {originalTitle}
          </p>

          {/* BADGES */}
          <div className="mb-5 flex flex-wrap items-center gap-1.5">
            {anime.type && (
              <span className="border-border bg-primary text-primary-soft rounded-md border px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase">
                {anime.type}
              </span>
            )}

            {airedSeason && (
              <span className="border-border bg-surface text-text rounded-md border px-2 py-0.5 text-[11px] font-medium">
                {airedSeason}
              </span>
            )}

            {anime.genres?.map((genre, i) => (
              <span
                key={i}
                className="border-border bg-surface text-text rounded-md border px-2 py-0.5 text-[11px] font-medium"
              >
                {genre.name}
              </span>
            ))}

            {anime.episodes && (
              <span className="border-border bg-surface text-text rounded-md border px-2 py-0.5 text-[11px] font-medium">
                {anime.episodes} Episodes
              </span>
            )}
          </div>

          {/* ACTIONS */}
          <div className="mb-6 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-primary text-surface flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition hover:cursor-pointer hover:opacity-90 active:scale-95 sm:w-auto"
            >
              <LuBookmark size={18} />
              Add to Watchlist
            </button>

            <ModalDialog
              title="Add to Watchlist"
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onSubmit={onSubmitWatchlist}
              footer={
                <>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="border-border hover:bg-surface-alt flex-1 rounded-lg border py-2.5 font-medium transition-colors hover:cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-surface hover:bg-primary-dark flex-1 rounded-lg py-2.5 font-medium transition-colors hover:cursor-pointer"
                  >
                    Submit
                  </button>
                </>
              }
            >
              {/*Modal dialog children*/}
              <div className="flex flex-col gap-4">
                <SelectOption label="Status" items={statusSelectItem} />
                <div className="flex flex-col gap-1">
                  <label htmlFor="progress" className="text-sm">
                    Episode progress
                  </label>
                  <div className="relative flex items-center gap-1">
                    <input
                      type="text"
                      name="progress"
                      id="progress"
                      className="border-border outline-primary w-full rounded-lg border px-3 py-2.5"
                    />
                    <div className="absolute right-1.5 flex items-center gap-1">
                      {anime.episodes && <p>/ {anime.episodes} eps</p>}
                      <button className="border-border rounded-full border p-2">
                        <LuPlus />
                      </button>
                      <button className="border-border rounded-full border p-2">
                        <LuMinus />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="score" className="text-sm">
                    Score (1-10)
                  </label>
                  <input
                    type="text"
                    name="score"
                    id="score"
                    className="border-border outline-primary w-full rounded-lg border px-3 py-2.5"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="score" className="text-sm">
                    Note
                  </label>
                  <textarea
                    cols={2}
                    className="border-border outline-primary w-full rounded-lg border px-3 py-2.5"
                  ></textarea>
                </div>
              </div>
            </ModalDialog>

            <button className="text-primary border-primary-soft hover:bg-surface-alt flex w-full items-center justify-center gap-1.5 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition active:scale-95 sm:w-auto">
              <LuShare2 size={18} />
              Share
            </button>
          </div>

          {/* SYNOPSIS */}
          <section>
            <h2 className="text-text mb-2 text-lg font-bold">Synopsis</h2>

            <p className="text-text/90 text-sm leading-relaxed md:text-sm">
              {anime.synopsis}
            </p>
          </section>

          {/* MOBILE METADATA */}
          <div className="border-border mt-8 border-t md:hidden">
            {metadata}
          </div>

          {/* COMMENTS */}
          <Comment />
        </main>
      </div>
    </div>
  );
};

export default MainInfo;
