function extendDefaultFields(defaults, session) {
    return {
      userId: session.userId,
    };
  }

  module.exports = extendDefaultFields