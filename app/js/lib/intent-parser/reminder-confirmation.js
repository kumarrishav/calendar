/* global TwitterCldr, TwitterCldrDataBundle */

import moment from 'components/moment';
import 'components/cldr/en';
import 'components/cldr/core';

/*
 * @todo:
 *   * @see http://www.unicode.org/cldr/charts/29/verify/dates/en.html
 *     for formatting the time of the day.
 */

const p = Object.freeze({
  // Properties
  listFormatter: Symbol('listFormatter'),

  // Methods
  getLocalised: Symbol('getLocalised'),
  formatUser: Symbol('formatUser'),
  formatAction: Symbol('formatAction'),
  formatTime: Symbol('formatTime'),
  isToday: Symbol('isToday'),
  isTomorrow: Symbol('isTomorrow'),
  isThisMonth: Symbol('isThisMonth'),
  formatHoursAndMinutes: Symbol('formatHoursAndMinutes'),
});

const DEFAULT_LOCALE = 'en';
const PATTERNS = {
  en: {
    template: `OK, I'll remind [users] [action] [time].`,
    formatUser: (user) => user
      .replace(/\bme\b/gi, 'you')
      .replace(/\bI'm\b/gi, 'you\'re')
      .replace(/\bI've\b/gi, 'you\'ve')
      .replace(/\bI'll\b/gi, 'you\'ll')
      .replace(/\bI\b/gi, 'you')
      .replace(/\bmy\b/gi, 'your')
      .replace(/\bmine\b/gi, 'yours'),
  },
  fr: {
    template: `OK, je rappelerai [users] [action] [time].`,
    formatUser: (user) => user,
  },
  ja: {
    template: `承知しました。[time][users]に[action]をリマインドします。`,
    formatUser: (user) => user,
  },
};

export default class Confirmation {
  constructor(locale = DEFAULT_LOCALE) {
    this.locale = locale;

    TwitterCldr.set_data(TwitterCldrDataBundle);

    this[p.listFormatter] = new TwitterCldr.ListFormatter();
  }

  /**
   * Generate a phrase to be spoken to confirm a reminder.
   *
   * @param {Object} reminder
   * @return {string}
   */
  getReminderMessage(reminder) {
    const template = this[p.getLocalised]('template');
    const data = {
      users: this[p.formatUser](reminder),
      action: this[p.formatAction](reminder),
      time: this[p.formatTime](reminder),
    };

    return template.replace(/\[([^\]]+)\]/g, (match, placeholder) => {
      return data[placeholder];
    });
  }

  /**
   * Given a property of the PATTERNS object, returns the one matching the
   * current locale or the default one if non existing.
   *
   * @param {string} prop
   * @returns {*}
   */
  [p.getLocalised](prop) {
    let locale = this.locale;
    if (!PATTERNS[this.locale] || !PATTERNS[this.locale][prop]) {
      locale = DEFAULT_LOCALE;
    }

    return PATTERNS[locale][prop];
  }

  [p.formatUser](reminder) {
    const { recipients } = reminder;
    const formatUser = this[p.getLocalised]('formatUser');
    const formattedRecipients = recipients.map(formatUser);
    return this[p.listFormatter].format(formattedRecipients);
  }

  [p.formatAction](reminder) {
    const { action } = reminder;
    const formatUser = this[p.getLocalised]('formatUser');
    const formattedAction = formatUser(action);
    const PATTERN1 = new RegExp(`\\bthat \\[action\\]`, 'iu');
    const PATTERN2 = new RegExp(`\\bit is \\[action\\]`, 'iu');
    const PATTERN3 = new RegExp(`\\babout \\[action\\]`, 'iu');

    if (PATTERN1.test(reminder.match)) {
      return `that ${formattedAction}`;
    } else if (PATTERN2.test(reminder.match)) {
      return `that it is ${formattedAction}`;
    } else if (PATTERN3.test(reminder.match)) {
      return `about ${formattedAction}`;
    }

    return `to ${formattedAction}`;
  }

  [p.formatTime](reminder) {
    const { due } = reminder;

    if (this[p.isToday](due)) {
      const hour = this[p.formatHoursAndMinutes](due);
      return `at ${hour} today`;
    } else if (this[p.isTomorrow](due)) {
      const hour = this[p.formatHoursAndMinutes](due);
      return `at ${hour} tomorrow`;
    } else if (this[p.isThisMonth](due)) {
      return moment(due).format('[on the] Do');
    }

    return moment(due).format('[on] MMMM [the] Do');
  }

  [p.isToday](date) {
    const today = moment().startOf('day');
    const tomorrow = moment().add(1, 'day').startOf('day');
    return moment(date).isBetween(today, tomorrow);
  }

  [p.isTomorrow](date) {
    const tomorrow = moment().add(1, 'day').startOf('day');
    const in2days = moment().add(2, 'day').startOf('day');
    return moment(date).isBetween(tomorrow, in2days);
  }

  [p.isThisMonth](date) {
    const thisMonth = moment().startOf('month');
    const nextMonth = moment().add(1, 'month').startOf('month');
    return moment(date).isBetween(thisMonth, nextMonth);
  }

  /**
   * Return a string from a date suitable for speech synthesis.
   *
   * @param {Date} date
   * @return {string}
   */
  [p.formatHoursAndMinutes](date) {
    date = moment(date);
    if (date.minute() === 0) {
      return date.format('h A'); // 7 PM
    } else if (date.minute() === 15) {
      return date.format('[quarter past] h A');
    } else if (date.minute() === 30) {
      return date.format('[half past] h A');
    } else if (date.minute() === 45) {
      const nextHour = date.add(1, 'hour');
      return nextHour.format('[quarter to] h A');
    }
    return date.format('h m A'); // 6 24 AM
  }
}
