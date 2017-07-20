import weather from './weather';

export function instance(config, {fetch, logger, utcOffset}) {
  const io = {};

  io.weather = weather(io, config.weather, {fetch, logger, utcOffset});

  return io;
}
