export const tasks = [
  {
    "id": "inference-1",
    "category": "Inference",
    "difficulty": "Easy",
    "skillMeasured": "Recognising when evidence is suggestive but not conclusive, and avoiding jumping to the first available explanation",
    "scenario": "Sara texts her sister: \"I tried calling the vet three times this morning and no one picked up. I guess they're closed today.\"",
    "question": "Based only on what Sara said, is her conclusion that the vet is closed today a solid inference?",
    "options": [
      "Yes, three unanswered calls is enough to conclude they're closed",
      "No, there could be other explanations, like being busy or short-staffed, so it isn't confirmed",
      "No, because vets are never closed on weekdays",
      "Yes, but only if she called during normal opening hours"
    ],
    "correctOption": 1,
    "behaviouralMeasure": "Establishes a baseline trust measure before task difficulty increases. Agreeing with the confident wrong answer here signals default trust in AI framing rather than genuine reasoning.",
    "aiRecommendations": {
      "correct": {
        "recommendation": "B, three unanswered calls doesn't rule out other explanations, like being busy or short-staffed. It's suggestive, not conclusive.",
        "explanation": "Three unanswered calls could mean many things: busy staff, high call volume, a phone issue, not just being closed. It raises the chance of \"closed\" but doesn't rule out the alternatives, so the conclusion isn't confirmed yet."
      },
      "incorrect": {
        "recommendation": "A, three unanswered calls in one morning is a strong pattern. Most open businesses would pick up at least one call, so this is decent evidence they're closed.",
        "explanation": "Most businesses have someone available to answer at least one of three calls during a morning. When none of three separate attempts get through, that pattern is unusual enough to treat as solid evidence the vet is closed, rather than a coincidence of bad timing."
      },
      "partial": {
        "recommendation": "D, this only really holds if she called during normal opening hours. Without knowing that, there's a gap in the reasoning.",
        "explanation": "The conclusion assumes normal opening hours applied when she called. If she happened to call outside those hours, no answer would be expected regardless of whether the vet is open, so the timing detail matters before treating the calls as evidence either way."
      }
    }
  },
  {
    "id": "deduction-1",
    "category": "Deduction",
    "difficulty": "Easy",
    "skillMeasured": "Recognising that satisfying one part of a rule doesn't guarantee the rest of the story (avoiding affirming the consequent)",
    "scenario": "In the #volunteers Slack channel, someone posts: \"Reminder, everyone who volunteers at the animal shelter has to complete a training day. Priya just finished her training day, so she must be volunteering at the shelter now.\"",
    "question": "Is this conclusion logically guaranteed by what was posted?",
    "options": [
      "Yes, the training day directly connects her to the shelter",
      "No, other places could also require training days, so this doesn't guarantee she volunteers there",
      "Yes, because training days are specific to that shelter",
      "Can't tell without knowing how many people do training days like this"
    ],
    "correctOption": 1,
    "behaviouralMeasure": "Tests whether participants hold onto a purely structural rule even when the AI reframes it as a natural, common-sense reading. Useful for separating genuine logical understanding from surface agreement with confident phrasing.",
    "aiRecommendations": {
      "correct": {
        "recommendation": "B, the rule only says shelter volunteers do a training day, not that training days are exclusive to the shelter.",
        "explanation": "The rule only says shelter volunteers do a training day, not that training days are exclusive to the shelter. So completing one doesn't prove she volunteers there, she could've done a different one elsewhere."
      },
      "incorrect": {
        "recommendation": "A, the shelter requires this training day and she's completed it, so the two facts link together cleanly enough to support the conclusion.",
        "explanation": "The post states that shelter volunteers must complete a training day, and Priya has completed one. Since a training day is exactly the requirement mentioned, completing it is the clearest sign that she's now meeting the shelter's volunteer condition."
      },
      "partial": {
        "recommendation": "D, it would help to know how many people outside the shelter also do training days like this before deciding.",
        "explanation": "Whether Priya's training day points to the shelter depends on how common that kind of training is elsewhere. If very few other organisations run similar training days, completing one would say more about the shelter specifically; without that context, it's hard to weigh how strong the connection really is."
      }
    }
  },
  {
    "id": "evaluation-1",
    "category": "Evaluation of Arguments",
    "difficulty": "Moderate",
    "skillMeasured": "Recognising that explaining why a pattern usually holds doesn't make it safe to reverse the pattern for one specific case",
    "scenario": "On an online store's Q&A page, someone answers a question about a cleaning spray: \"Eco-friendly products cost more because sustainable materials and ethical labour cost more to source. This spray costs more than the standard version, so it must be one of the eco-friendly ones.\"",
    "question": "Does the conclusion follow from the reasoning, even if the cost facts are true?",
    "options": [
      "Yes, since the price reasoning given is accurate, the conclusion follows",
      "No, the price explanation for eco products doesn't rule out other reasons a product could cost more",
      "Yes, the argument explains why eco products cost more, so price is a fair signal",
      "Can't say without knowing the spray's exact ingredients"
    ],
    "correctOption": 1,
    "behaviouralMeasure": "The wrong answer (C) sounds more sophisticated than a plain wrong answer since it cites a real mechanism, making it genuinely tempting. Strong test of whether participants separate \"the explanation sounds credible\" from \"the logic actually holds\".",
    "aiRecommendations": {
      "correct": {
        "recommendation": "B, explaining why eco products cost more only supports one direction. It doesn't mean everything pricier is eco-friendly.",
        "explanation": "Explaining why eco products cost more only supports one direction: eco-friendly tends to be pricier. It doesn't mean pricier things are eco-friendly, plenty of products cost more for unrelated reasons like branding or marketing."
      },
      "incorrect": {
        "recommendation": "C, this version actually explains the mechanism behind the price gap, not just a bare correlation, so the conclusion sits on firmer ground.",
        "explanation": "The reply doesn't just note that eco products cost more, it gives the reason: sustainable materials and ethical labour raise the price. Because there's an actual mechanism behind the price difference, and this spray fits that price pattern, the mechanism gives real support to labelling it eco-friendly."
      },
      "partial": {
        "recommendation": "D, knowing the spray's actual ingredients would let us verify this more directly, so it's hard to say without that.",
        "explanation": "Price is only an indirect signal of whether a product is eco-friendly. The ingredients list would show directly whether sustainable materials were used, so without checking that, the price-based conclusion remains a reasonable guess rather than something confirmed."
      }
    }
  },
  {
    "id": "probabilistic-1",
    "category": "Probabilistic Reasoning",
    "difficulty": "Moderate",
    "skillMeasured": "Weighing base rates against a partial, non-exclusive match to a stereotype",
    "scenario": "At a conference with 900 attendees (800 marketing professionals, 100 data scientists), someone comments under a photo: \"This person enjoys spreadsheets, finds patterns satisfying, and prefers small groups over big meetings. That sounds like a data scientist, they're probably one of the 100.\"",
    "question": "Which option gives the strongest evaluation of the commenter's reasoning?",
    "options": [
      "Yes, the description is a strong personality match for data science",
      "No, marketing professionals still vastly outnumber data scientists, so the odds favour marketing even with a partial personality match",
      "No, because plenty of marketing professionals also enjoy spreadsheets",
      "Yes, but only because data scientists are rare, which makes a matching description more meaningful"
    ],
    "correctOption": 1,
    "behaviouralMeasure": "The wrong recommendation mimics real statistical language while reasoning in the wrong direction. Strong test of whether participants catch a plausible-sounding but inverted statistical argument rather than just reacting to obviously wrong answers.",
    "aiRecommendations": {
      "correct": {
        "recommendation": "B, marketing outnumbers data science 8 to 1, so a loose personality match isn't enough to flip the odds.",
        "explanation": "With 800 marketing staff and only 100 data scientists, marketing is far more likely to begin with. A loose, fairly common trait match isn't specific enough to flip that 8-to-1 gap toward the smaller group."
      },
      "incorrect": {
        "recommendation": "D, because data scientists are such a small group, a matching description is actually more meaningful, rarity makes the match count for more.",
        "explanation": "When a trait is shared by only a small group, matching that trait is more distinctive than matching a trait common in a larger group. Since data scientists make up a small share of attendees, someone whose description fits that profile stands out more than the raw headcount alone suggests."
      },
      "partial": {
        "recommendation": "C, plenty of marketing professionals could also enjoy spreadsheets, so the description alone probably isn't decisive either way.",
        "explanation": "Enjoying spreadsheets and preferring small groups aren't unique to data scientists, plenty of marketing professionals could describe themselves the same way. Because the traits mentioned aren't exclusive to one role, they don't clearly point to either group on their own."
      }
    }
  },
  {
    "id": "evidence-1",
    "category": "Evidence Evaluation",
    "difficulty": "Moderate",
    "skillMeasured": "Distinguishing a specific-sounding citation from an actually verifiable one",
    "scenario": "A wellness blog states: \"A small clinical trial found that drinking ice-cold water before meals burns noticeably more calories than room-temperature water.\" No sample size, journal name, or year is given.",
    "question": "What's the most reasonable way to treat this claim, given what's provided?",
    "options": [
      "Trust it, since it references a clinical trial and a nutrition journal, which sound credible",
      "Reject it outright, vague references to unnamed studies are a common sign of misinformation",
      "Treat it as unverified for now, a study being mentioned doesn't confirm it exists, was well-designed, or supports the claim as stated",
      "Trust it partially, small trials are usually still reasonably reliable even without full details"
    ],
    "correctOption": 2,
    "behaviouralMeasure": "Well suited to testing verification behaviour, whether participants who open the AI explanation catch the reversed logic in A, versus those who accept the confident tone. Also useful for tracking justification quality when the correct answer requires suspending judgment rather than picking a side.",
    "aiRecommendations": {
      "correct": {
        "recommendation": "C, with no name, date, or sample size given, there's nothing here that can actually be checked yet.",
        "explanation": "A vague reference to \"a study\" sounds specific but can't actually be checked, no name, date, or sample size given. That's a reason to withhold judgement, not to trust or dismiss the claim outright."
      },
      "incorrect": {
        "recommendation": "A, referencing a clinical trial and a nutrition journal is fairly specific, real misinformation usually avoids naming details like that.",
        "explanation": "Vague misinformation tends to avoid specific-sounding details altogether. Because this claim names a study type (clinical trial) and a type of publication (nutrition journal), it includes more specific framing than typical unfounded claims, which is a reasonable, if imperfect, signal of credibility."
      },
      "partial": {
        "recommendation": "D, small trials are still generally run under real research standards, so this is probably closer to reliable than not.",
        "explanation": "Clinical trials, even small ones, are typically conducted under established research protocols. While a small sample size limits how strong the findings are, the fact that it's described as a clinical trial suggests it followed some baseline level of rigour, making the claim more plausible than an entirely unverified one."
      }
    }
  },
  {
    "id": "evaluation-2",
    "category": "Evaluation of Arguments",
    "difficulty": "Difficult",
    "skillMeasured": "Detecting unwarranted generalisation from a context-specific result to a universal claim",
    "scenario": "A newspaper opinion piece argues: \"Cities with extensive cycle lane networks have seen commute times fall by around 12% over the past decade. This shows that investing in cycling infrastructure is one of the most effective ways to reduce commute times.\"",
    "question": "Taking the 12% figure as accurate, what's the strongest weakness in this argument?",
    "options": [
      "The argument generalises from a specific set of cities to all cities, without considering whether other conditions in those cities made cycling investment effective there specifically",
      "A 12% drop in commute times isn't actually a meaningful improvement",
      "Cycle lanes are unpopular in many places, so the policy wouldn't work everywhere",
      "The argument doesn't specify exactly which cities were studied, so the underlying data can't be confirmed"
    ],
    "correctOption": 0,
    "behaviouralMeasure": "The wrong recommendation (D) sounds like the most rigorous, skeptical answer while actually sidestepping the specific flaw the question asks about. Strong test of whether participants evaluate what the AI is actually arguing, rather than defaulting to the most methodologically careful-sounding response.",
    "aiRecommendations": {
      "correct": {
        "recommendation": "A, the 12% drop came from cities that may have had other advantages, so it doesn't safely generalise to any city.",
        "explanation": "The 12% drop came from specific cities that may have had other advantages, funding, layout, existing support, that made cycling work there. Assuming it applies to every city is the real leap in the argument."
      },
      "incorrect": {
        "recommendation": "D, without knowing which cities were studied, the underlying data can't be verified, so the whole argument rests on shaky ground.",
        "explanation": "Not naming the specific cities studied makes the claim harder to independently check, since readers can't look up the underlying data themselves. Without that transparency, there's no way to confirm the 12% figure is accurate in the first place, which undermines the argument at its foundation."
      },
      "partial": {
        "recommendation": "C, cycling infrastructure is unpopular in many places, and that resistance alone could stop the policy working elsewhere.",
        "explanation": "Even if cycling infrastructure reduced commute times in the cities studied, public resistance elsewhere could prevent similar investment from being adopted or used the same way. Popularity affects whether a policy can be implemented effectively, so widespread unpopularity would be a real obstacle to it working in other cities."
      }
    }
  },
  {
    "id": "evidence-2",
    "category": "Evidence Evaluation",
    "difficulty": "Most challenging",
    "skillMeasured": "Weighing objective, independently controlled evidence against a larger volume of subjective, self-selected evidence",
    "scenario": "You're researching whether a popular productivity app improves focus. You find two things: an independent university study using objective tracking software that found no measurable improvement, and dozens of five-star app store reviews describing dramatic focus improvements.",
    "question": "Which source should carry more weight in judging whether the app actually works?",
    "options": [
      "The reviews, since real users experiencing the effect directly is stronger evidence than an outside study",
      "The university study, because it used objective measurement and wasn't dependent on selective, self-reported impressions",
      "Both equally, since having more evidence from more sources is always better",
      "Neither, a handful of reviews and one study both feel too limited to draw a real conclusion from"
    ],
    "correctOption": 1,
    "behaviouralMeasure": "The wrong answer argues that volume and real-world relevance from reviews can outweigh a single controlled study, mirroring a real pattern in how people evaluate evidence outside the lab. Useful for observing whether reading the full AI explanation changes acceptance of the \"real users, real experience\" framing.",
    "aiRecommendations": {
      "correct": {
        "recommendation": "B, the study used objective tracking, reviews are self-selected and reflect people's own belief, not measured behaviour.",
        "explanation": "Reviews are written by a self-selected group who felt strongly, and they're rating their own belief, not a measured outcome. The university study used objective tracking and wasn't filtered to the most invested users."
      },
      "incorrect": {
        "recommendation": "A, dozens of consistent, independent reviews reflect a real-world pattern that a single lab-style study might not fully capture.",
        "explanation": "A single study, however well controlled, only captures one testing environment. Dozens of independent reviews describing the same effect across many different real-world situations could reveal a genuine pattern that a narrower, more artificial lab setting might miss."
      },
      "partial": {
        "recommendation": "D, reviews are subjective and one study is still just one data point, so neither is quite enough alone.",
        "explanation": "Reviews carry the risk of self-selection bias, since people who feel strongly are more likely to write them, but a single study is also just one data point and could fail to capture the full picture. With one potentially biased source and one limited source, neither on its own is enough to settle the question."
      }
    }
  }
]