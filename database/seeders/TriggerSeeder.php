<?php

namespace Database\Seeders;

use App\Models\MasterTrigger;
use App\Models\TriggerContent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class TriggerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $triggers = [
            [
                'name' => 'Sexual violence and coercion',
                'importance' => 100,
                'description' => 'Covers all forms of nonconsensual sexual acts, sexual assault, forced exposure, and situations where characters are manipulated or coerced into sexual compliance.',
                'contents' => [
                    ['name' => 'Rape', 'importance' => 100, 'description' => 'Any nonconsensual sexual assault, shown or implied.'],
                    ['name' => 'Attempted rape', 'importance' => 95, 'description' => 'Failed or interrupted rape attempts.'],
                    ['name' => 'Sexual coercion', 'importance' => 90, 'description' => 'Sexual acts forced through threats, manipulation, or pressure.'],
                    ['name' => 'Sexual blackmail', 'importance' => 85, 'description' => 'Using threats or leverage to force sexual compliance.'],
                    ['name' => 'Molestation', 'importance' => 80, 'description' => 'Unwanted sexual touching or assault.'],
                    ['name' => 'Sexual slavery', 'importance' => 75, 'description' => 'Characters being controlled or traded for sexual exploitation.'],
                    ['name' => 'Forced nudity', 'importance' => 70, 'description' => 'Being stripped or exposed against one’s will.'],
                    ['name' => 'Sexual exploitation', 'importance' => 65, 'description' => 'Abuse or manipulation for sexual gain.'],
                ],
            ],
            [
                'name' => 'Relationship abuse',
                'importance' => 95,
                'description' => 'Contains triggers related to toxic romantic dynamics, such as infidelity, extreme jealousy, partner betrayal (NTR), stalking, grooming, and emotional manipulation.',
                'contents' => [
                    ['name' => 'NTR', 'importance' => 100, 'description' => 'Partner betrayal, being taken away, or romantic cheating drama.'],
                    ['name' => 'Cheating', 'importance' => 95, 'description' => 'Infidelity or romantic betrayal.'],
                    ['name' => 'Grooming', 'importance' => 90, 'description' => 'Manipulating someone into a relationship through trust abuse or power imbalance.'],
                    ['name' => 'Age gap romance', 'importance' => 85, 'description' => 'Romance with a major age imbalance, especially involving minors.'],
                    ['name' => 'Stalking', 'importance' => 80, 'description' => 'Following, surveillance, or obsessive pursuit.'],
                    ['name' => 'Possessive behavior', 'importance' => 75, 'description' => 'Controlling, jealous, or domineering romance behavior.'],
                    ['name' => 'Emotional abuse', 'importance' => 70, 'description' => 'Humiliation, intimidation, shaming, or repeated emotional harm.'],
                    ['name' => 'Manipulation', 'importance' => 65, 'description' => 'Gaslighting, coercion, or deceit within relationships.'],
                ],
            ],
            [
                'name' => 'Gore and physical violence',
                'importance' => 90,
                'description' => 'Flags graphic displays of physical harm, including heavy bloodshed, lost limbs, severe wounds, torture scenes, and highly detailed violent acts.',
                'contents' => [
                    ['name' => 'Gore', 'importance' => 100, 'description' => 'Heavy blood and graphic injury detail.'],
                    ['name' => 'Dismemberment', 'importance' => 95, 'description' => 'Loss of limbs or body parts.'],
                    ['name' => 'Decapitation', 'importance' => 90, 'description' => 'Heads being severed or shown detached.'],
                    ['name' => 'Torture', 'importance' => 85, 'description' => 'Physical or psychological torture scenes.'],
                    ['name' => 'Mutilation', 'importance' => 80, 'description' => 'Severe body damage or disfigurement.'],
                    ['name' => 'Severe injury', 'importance' => 75, 'description' => 'Broken bones, crushed bodies, and serious wounds.'],
                    ['name' => 'Blood spray', 'importance' => 70, 'description' => 'Large blood bursts or heavy blood effects.'],
                    ['name' => 'Graphic violence', 'importance' => 65, 'description' => 'Violence shown in a detailed or lingering way.'],
                ],
            ],
            [
                'name' => 'Taboos and Family Dynamics',
                'importance' => 88,
                'description' => 'Highlights controversial or socially taboo relationship dynamics, specifically focusing on romantic or sexual tension between blood relatives, step families, or guardians.',
                'contents' => [
                    ['name' => 'Incest', 'importance' => 100, 'description' => 'Sexual or romantic interest between blood related family members.'],
                    ['name' => 'Pseudo-incest', 'importance' => 85, 'description' => 'Romance between step siblings or non-blood family.'],
                    ['name' => 'Cousin Romance', 'importance' => 80, 'description' => 'Romantic relationships between cousins.'],
                    ['name' => 'Guardian Romance', 'importance' => 85, 'description' => 'Romance between a ward and their legal guardian or parent figure.'],
                ],
            ],
            [
                'name' => 'Animal Welfare',
                'importance' => 82,
                'description' => 'Warns about content involving harm to animals and pets, including cruelty, death, lab experimentation, or disturbing human and animal fusions.',
                'contents' => [
                    ['name' => 'Animal death', 'importance' => 100, 'description' => 'The death of a pet or animal character.'],
                    ['name' => 'Animal cruelty', 'importance' => 95, 'description' => 'Deliberate harm or torture of animals.'],
                    ['name' => 'Animal experimentation', 'importance' => 85, 'description' => 'Laboratory testing or scientific abuse of animals.'],
                    ['name' => 'Human-Animal Hybridization', 'importance' => 90, 'description' => 'Body horror involving the fusion of humans and animals.'],
                ],
            ],
            [
                'name' => 'Anime Specific Tropes',
                'importance' => 85,
                'description' => 'Covers uniquely prevalent anime themes like loss of bodily autonomy via mind control, predatory visual tropes, forced gender changes, and questionable framing of youthful characters.',
                'contents' => [
                    ['name' => 'Mind Control', 'importance' => 95, 'description' => 'Loss of bodily or mental autonomy via hypnosis or magic.'],
                    ['name' => 'Loli/Shota framing', 'importance' => 100, 'description' => 'Sexualized portrayal of characters who appear as young children.'],
                    ['name' => 'Ugly Bastard imagery', 'importance' => 90, 'description' => 'Specific visual tropes involving predatory power imbalances.'],
                    ['name' => 'Non-consensual Gender Bending', 'importance' => 75, 'description' => 'Forced physical sex change against a character\'s will.'],
                ],
            ],
            [
                'name' => 'Psychological distress',
                'importance' => 85,
                'description' => 'Details mental and emotional trauma, including suicidal themes, self injury, severe anxiety, lingering PTSD flashbacks, and psychological manipulation.',
                'contents' => [
                    ['name' => 'Suicide', 'importance' => 100, 'description' => 'Suicide, attempts, or explicit suicidal ideation.'],
                    ['name' => 'Self harm', 'importance' => 95, 'description' => 'Deliberate injury to oneself.'],
                    ['name' => 'PTSD', 'importance' => 90, 'description' => 'Post trauma symptoms, flashbacks, or trauma responses.'],
                    ['name' => 'Trauma flashbacks', 'importance' => 85, 'description' => 'Past traumatic events being relived or remembered in detail.'],
                    ['name' => 'Gaslighting', 'importance' => 80, 'description' => 'Manipulating someone into doubting their reality.'],
                    ['name' => 'Hallucinations', 'importance' => 75, 'description' => 'Seeing or hearing things that are not there.'],
                    ['name' => 'Brainwashing', 'importance' => 70, 'description' => 'Mental control, forced belief changes, or coercive conditioning.'],
                    ['name' => 'Panic attacks', 'importance' => 65, 'description' => 'Characters experiencing panic or severe anxiety episodes.'],
                ],
            ],
            [
                'name' => 'Sensory and Health',
                'importance' => 75,
                'description' => 'Flags audio and visual production elements that might cause physical discomfort, such as strobe lights, motion sickness inducing camera work, or triggering sounds.',
                'contents' => [
                    ['name' => 'Flashing lights', 'importance' => 100, 'description' => 'Rapid strobe effects that may trigger seizures.'],
                    ['name' => 'Shaky cam', 'importance' => 60, 'description' => 'High speed 3D or handheld camera movement causing nausea.'],
                    ['name' => 'Misophonia', 'importance' => 55, 'description' => 'Specific triggering sounds like heavy eating or scratching.'],
                ],
            ],
            [
                'name' => 'Horror and supernatural horror',
                'importance' => 80,
                'description' => 'Covers terrifying and supernatural elements, ranging from demonic possession and dark rituals to disturbing bodily mutations and ghostly hauntings.',
                'contents' => [
                    ['name' => 'Possession', 'importance' => 100, 'description' => 'Demons, spirits, parasites, or other forces controlling a body.'],
                    ['name' => 'Exorcism', 'importance' => 95, 'description' => 'Rituals or scenes involving supernatural removal or purification.'],
                    ['name' => 'Curses', 'importance' => 90, 'description' => 'Supernatural punishment, bad luck, or cursed objects and people.'],
                    ['name' => 'Ghosts', 'importance' => 85, 'description' => 'Spirit apparitions or haunting entities.'],
                    ['name' => 'Hauntings', 'importance' => 80, 'description' => 'Locations or characters being haunted.'],
                    ['name' => 'Body horror', 'importance' => 75, 'description' => 'Disturbing physical transformation or bodily corruption.'],
                    ['name' => 'Transformation horror', 'importance' => 70, 'description' => 'People changing into monsters or losing human form.'],
                    ['name' => 'Occult rituals', 'importance' => 65, 'description' => 'Summoning, sacrifice, and dark ritual content.'],
                ],
            ],
            [
                'name' => 'Abuse and exploitation',
                'importance' => 78,
                'description' => 'Warns of systemic and interpersonal cruelty, including child neglect, human trafficking, forced captivity, severe bullying, and physical or emotional abuse by authority figures.',
                'contents' => [
                    ['name' => 'Child abuse', 'importance' => 100, 'description' => 'Abuse, neglect, or exploitation of children.'],
                    ['name' => 'Domestic abuse', 'importance' => 95, 'description' => 'Abuse within families or home relationships.'],
                    ['name' => 'Slavery', 'importance' => 90, 'description' => 'Forced labor, ownership, or servitude.'],
                    ['name' => 'Trafficking', 'importance' => 85, 'description' => 'Human trafficking, forced transport, or sale of people.'],
                    ['name' => 'Imprisonment', 'importance' => 80, 'description' => 'Being locked up or detained against one’s will.'],
                    ['name' => 'Captivity', 'importance' => 75, 'description' => 'Kidnapping, hostage situations, or forced confinement.'],
                    ['name' => 'Bullying', 'importance' => 70, 'description' => 'Harassment, humiliation, exclusion, or repeated cruelty.'],
                    ['name' => 'Power abuse', 'importance' => 65, 'description' => 'Abuse of authority, rank, or social control.'],
                ],
            ],
            [
                'name' => 'Sexual content and fanservice',
                'importance' => 75,
                'description' => 'Groups all sexually suggestive content, from explicit scenes and full nudity to heavy fanservice, voyeurism, specific fetishes, and inappropriate camera angles.',
                'contents' => [
                    ['name' => 'Nudity', 'importance' => 100, 'description' => 'Full or partial nudity.'],
                    ['name' => 'Explicit sex', 'importance' => 95, 'description' => 'Onscreen sex or clearly shown sexual activity.'],
                    ['name' => 'Fanservice', 'importance' => 90, 'description' => 'Sexualized camera work or unnecessary body focus.'],
                    ['name' => 'Sexual jokes', 'importance' => 85, 'description' => 'Jokes built around sexual content or harassment.'],
                    ['name' => 'Fetish content', 'importance' => 80, 'description' => 'Material framed around fetish themes or kinks.'],
                    ['name' => 'Voyeurism', 'importance' => 75, 'description' => 'Watching, spying, or peeping for sexual purposes.'],
                    ['name' => 'Underwear shots', 'importance' => 70, 'description' => 'Camera framing focused on underwear or upskirt shots.'],
                    ['name' => 'Sexualized minors', 'importance' => 100, 'description' => 'Sexual framing involving underage characters.'],
                ],
            ],
            [
                'name' => 'Death and grief',
                'importance' => 72,
                'description' => 'Flags themes of mortality and mourning, including major character deaths, large scale massacres, depictions of severe grief, and funeral ceremonies.',
                'contents' => [
                    ['name' => 'Character death', 'importance' => 100, 'description' => 'Major or minor character deaths.'],
                    ['name' => 'Child death', 'importance' => 95, 'description' => 'Death of a child or child victimization.'],
                    ['name' => 'Parental death', 'importance' => 90, 'description' => 'Death of a parent or parent figure.'],
                    ['name' => 'Grief', 'importance' => 85, 'description' => 'Mourning, loss, and survivor sadness.'],
                    ['name' => 'Survivor guilt', 'importance' => 80, 'description' => 'Characters blaming themselves for surviving tragedy.'],
                    ['name' => 'Massacre', 'importance' => 75, 'description' => 'Mass killing or large scale slaughter.'],
                    ['name' => 'Genocide', 'importance' => 70, 'description' => 'Attempted or completed extermination of a group.'],
                    ['name' => 'Funeral scenes', 'importance' => 65, 'description' => 'Funeral, burial, or memorial content.'],
                ],
            ],
            [
                'name' => 'Body and medical content',
                'importance' => 68,
                'description' => 'Details medical procedures and bodily functions, including hospital settings, needle use, contagious diseases, pregnancy, childbirth, and prominent bodily fluids.',
                'contents' => [
                    ['name' => 'Surgery', 'importance' => 100, 'description' => 'Operations or surgical procedures.'],
                    ['name' => 'Injections', 'importance' => 95, 'description' => 'Needles, shots, or forced injections.'],
                    ['name' => 'Disease', 'importance' => 90, 'description' => 'Illness, illness progression, or disease focus.'],
                    ['name' => 'Infection', 'importance' => 85, 'description' => 'Contagion, parasites, or bodily infection.'],
                    ['name' => 'Vomit', 'importance' => 80, 'description' => 'Vomiting or vomit related scenes.'],
                    ['name' => 'Bodily fluids', 'importance' => 75, 'description' => 'Blood, mucus, saliva, or other fluid heavy content.'],
                    ['name' => 'Pregnancy', 'importance' => 70, 'description' => 'Pregnancy or pregnancy related themes.'],
                    ['name' => 'Childbirth', 'importance' => 65, 'description' => 'Labor, delivery, or birth scenes.'],
                ],
            ],
            [
                'name' => 'Discrimination and identity hostility',
                'importance' => 65,
                'description' => 'Warns about bigotry and prejudice, including racism, explicit slurs, hate speech, and hostility directed at specific gender identities or sexual orientations.',
                'contents' => [
                    ['name' => 'Racism', 'importance' => 100, 'description' => 'Racial prejudice, discrimination, or racist abuse.'],
                    ['name' => 'Species discrimination', 'importance' => 95, 'description' => 'Fantasy or sci fi prejudice based on species or race analogues.'],
                    ['name' => 'Slurs', 'importance' => 90, 'description' => 'Hateful or degrading language.'],
                    ['name' => 'Transphobic framing', 'importance' => 85, 'description' => 'Mockery, hostility, or negative framing toward trans people or gender nonconforming characters.'],
                    ['name' => 'Misgendering', 'importance' => 80, 'description' => 'Characters being referred to with the wrong gender terms on purpose or for ridicule.'],
                    ['name' => 'Homophobic content', 'importance' => 75, 'description' => 'Hostility or mockery aimed at queer characters or relationships.'],
                    ['name' => 'Hate speech', 'importance' => 70, 'description' => 'Explicit hateful or dehumanizing dialogue.'],
                    ['name' => 'Prejudice', 'importance' => 65, 'description' => 'General bias, segregation, or discriminatory treatment.'],
                ],
            ],
            [
                'name' => 'Substance use and altered state',
                'importance' => 60,
                'description' => 'Covers the consumption and impact of drugs and alcohol, including addiction, overdose, forced intoxication, and visual representations of being under the influence.',
                'contents' => [
                    ['name' => 'Alcohol abuse', 'importance' => 100, 'description' => 'Heavy drinking, dependency, or alcohol misuse.'],
                    ['name' => 'Drug use', 'importance' => 95, 'description' => 'Recreational drug use or drug related scenes.'],
                    ['name' => 'Smoking', 'importance' => 90, 'description' => 'Cigarettes, cigars, or frequent smoking imagery.'],
                    ['name' => 'Overdose', 'importance' => 85, 'description' => 'Drug or substance overdose scenes.'],
                    ['name' => 'Forced drugging', 'importance' => 80, 'description' => 'Characters being drugged against their will.'],
                    ['name' => 'Intoxication', 'importance' => 75, 'description' => 'Drunken or drugged behavior and impairment.'],
                    ['name' => 'Dissociation', 'importance' => 70, 'description' => 'Detached, unreal, or dissociative altered state scenes.'],
                    ['name' => 'Hallucinatory drug effects', 'importance' => 65, 'description' => 'Visual or mental distortions caused by substances.'],
                ],
            ],
        ];

        Model::unguarded(function () use ($triggers) {
            foreach ($triggers as $trigger) {
                $master = MasterTrigger::updateOrCreate(
                    ['name' => $trigger['name']],
                    [
                        'importance' => $trigger['importance'],
                        'description' => $trigger['description'],
                    ]
                );

                foreach ($trigger['contents'] as $content) {
                    TriggerContent::updateOrCreate(
                        [
                            'trigger_id' => $master->id,
                            'name' => $content['name'],
                        ],
                        [
                            'importance' => $content['importance'],
                            'description' => $content['description'],
                        ]
                    );
                }
            }
        });
    }
}
