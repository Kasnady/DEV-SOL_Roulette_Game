const MIN = 1, MAX = 5;
export const randomNumber = () => Math.floor(Math.random() * (MAX - MIN) + MIN);

export const getReturnAmount = (amountOfStake, ratioOfStake) => amountOfStake * ratioOfStake;