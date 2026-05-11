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
                'description' => 'Covers all forms of nonconsensual sexual acts, forced exposure, and sexual coercion.',
                'contents' => [
                    ['name' => 'Rape', 'importance' => 100, 'description' => 'Nonconsensual sexual assault, shown or implied.'],
                    ['name' => 'Attempted rape', 'importance' => 95, 'description' => 'Failed or interrupted rape attempts.'],
                    ['name' => 'Sexual coercion', 'importance' => 90, 'description' => 'Sexual acts forced through threats, manipulation, or pressure.'],
                    ['name' => 'Sexual blackmail', 'importance' => 85, 'description' => 'Using threats or leverage to force sexual compliance.'],
                    ['name' => 'Molestation', 'importance' => 80, 'description' => 'Unwanted sexual touching or assault.'],
                    ['name' => 'Sexual slavery', 'importance' => 75, 'description' => 'Characters controlled or traded for sexual exploitation.'],
                    ['name' => 'Forced nudity', 'importance' => 70, 'description' => 'Stripped or exposed against one’s will.'],
                    ['name' => 'Sexual exploitation', 'importance' => 65, 'description' => 'Abuse or manipulation for sexual gain.'],
                ],
            ],
            [
                'name' => 'Relationship abuse',
                'importance' => 95,
                'description' => 'Triggers related to toxic romantic dynamics like infidelity, stalking, grooming, and emotional manipulation.',
                'contents' => [
                    ['name' => 'NTR', 'importance' => 100, 'description' => 'Partner betrayal, being taken away, or romantic cheating.'],
                    ['name' => 'Cheating', 'importance' => 95, 'description' => 'Infidelity or romantic betrayal.'],
                    ['name' => 'Grooming', 'importance' => 90, 'description' => 'Manipulating someone into a relationship via trust abuse.'],
                    ['name' => 'Age gap romance', 'importance' => 85, 'description' => 'Romance with a major age imbalance, especially involving minors.'],
                    ['name' => 'Stalking', 'importance' => 80, 'description' => 'Following, surveillance, or obsessive pursuit.'],
                    ['name' => 'Possessive behavior', 'importance' => 75, 'description' => 'Controlling, jealous, or domineering behavior.'],
                    ['name' => 'Emotional abuse', 'importance' => 70, 'description' => 'Humiliation, intimidation, shaming, or repeated emotional harm.'],
                    ['name' => 'Manipulation', 'importance' => 65, 'description' => 'Gaslighting, coercion, or deceit within relationships.'],
                ],
            ],
            [
                'name' => 'Gore and physical violence',
                'importance' => 90,
                'description' => 'Graphic displays of physical harm, including bloodshed, mutilation, torture, and detailed violence.',
                'contents' => [
                    ['name' => 'Gore', 'importance' => 100, 'description' => 'Heavy blood and graphic injury detail.'],
                    ['name' => 'Dismemberment', 'importance' => 95, 'description' => 'Loss of limbs or body parts.'],
                    ['name' => 'Decapitation', 'importance' => 90, 'description' => 'Heads severed or shown detached.'],
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
                'description' => 'Socially taboo relationship dynamics involving romantic or sexual tension between relatives or guardians.',
                'contents' => [
                    ['name' => 'Incest', 'importance' => 100, 'description' => 'Sexual or romantic interest between blood relatives.'],
                    ['name' => 'Pseudo-incest', 'importance' => 85, 'description' => 'Romance between step siblings or non-blood family.'],
                    ['name' => 'Cousin Romance', 'importance' => 80, 'description' => 'Romantic relationships between cousins.'],
                    ['name' => 'Guardian Romance', 'importance' => 85, 'description' => 'Romance between a ward and their legal guardian.'],
                ],
            ],
            [
                'name' => 'Animal Welfare',
                'importance' => 82,
                'description' => 'Content involving harm to animals, including cruelty, death, experimentation, or human animal fusions.',
                'contents' => [
                    ['name' => 'Animal death', 'importance' => 100, 'description' => 'Death of a pet or animal character.'],
                    ['name' => 'Animal cruelty', 'importance' => 95, 'description' => 'Deliberate harm or torture of animals.'],
                    ['name' => 'Animal experimentation', 'importance' => 85, 'description' => 'Laboratory testing or scientific abuse of animals.'],
                    ['name' => 'Human-Animal Hybridization', 'importance' => 90, 'description' => 'Body horror involving human and animal fusion.'],
                ],
            ],
            [
                'name' => 'Anime Specific Tropes',
                'importance' => 85,
                'description' => 'Prevalent anime themes like mind control, predatory visual tropes, and questionable framing of youths.',
                'contents' => [
                    ['name' => 'Mind Control', 'importance' => 95, 'description' => 'Loss of bodily autonomy via hypnosis or magic.'],
                    ['name' => 'Loli/Shota framing', 'importance' => 100, 'description' => 'Sexualized portrayal of young looking children.'],
                    ['name' => 'Ugly Bastard imagery', 'importance' => 90, 'description' => 'Visual tropes involving predatory power imbalances.'],
                    ['name' => 'Non-consensual Gender Bending', 'importance' => 75, 'description' => 'Forced physical sex change against one\'s will.'],
                ],
            ],
            [
                'name' => 'Psychological distress',
                'importance' => 85,
                'description' => 'Mental and emotional trauma, including suicidal themes, self injury, anxiety, PTSD, and manipulation.',
                'contents' => [
                    ['name' => 'Suicide', 'importance' => 100, 'description' => 'Suicide, attempts, or explicit suicidal ideation.'],
                    ['name' => 'Self harm', 'importance' => 95, 'description' => 'Deliberate injury to oneself.'],
                    ['name' => 'PTSD', 'importance' => 90, 'description' => 'Post trauma symptoms, flashbacks, or trauma responses.'],
                    ['name' => 'Trauma flashbacks', 'importance' => 85, 'description' => 'Traumatic events relived or remembered in detail.'],
                    ['name' => 'Gaslighting', 'importance' => 80, 'description' => 'Manipulating someone into doubting their reality.'],
                    ['name' => 'Hallucinations', 'importance' => 75, 'description' => 'Seeing or hearing things that are not there.'],
                    ['name' => 'Brainwashing', 'importance' => 70, 'description' => 'Mental control, forced belief changes, or conditioning.'],
                    ['name' => 'Panic attacks', 'importance' => 65, 'description' => 'Characters experiencing severe panic or anxiety.'],
                ],
            ],
            [
                'name' => 'Sensory and Health',
                'importance' => 75,
                'description' => 'Audio and visual elements causing physical discomfort, like strobe lights, shaky cameras, or triggering sounds.',
                'contents' => [
                    ['name' => 'Flashing lights', 'importance' => 100, 'description' => 'Rapid strobe effects that may trigger seizures.'],
                    ['name' => 'Shaky cam', 'importance' => 60, 'description' => 'Heavy camera movement causing nausea.'],
                    ['name' => 'Misophonia', 'importance' => 55, 'description' => 'Triggering sounds like heavy eating or scratching.'],
                ],
            ],
            [
                'name' => 'Horror and Supernatural',
                'importance' => 80,
                'description' => 'Terrifying and supernatural elements like demonic possession, dark rituals, body horror, and hauntings.',
                'contents' => [
                    ['name' => 'Possession', 'importance' => 100, 'description' => 'Demons, spirits, or forces controlling a body.'],
                    ['name' => 'Exorcism', 'importance' => 95, 'description' => 'Supernatural removal or purification rituals.'],
                    ['name' => 'Curses', 'importance' => 90, 'description' => 'Supernatural punishment or cursed objects.'],
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
                'description' => 'Systemic and interpersonal cruelty, including trafficking, forced captivity, bullying, and authority abuse.',
                'contents' => [
                    ['name' => 'Child abuse', 'importance' => 100, 'description' => 'Abuse, neglect, or exploitation of children.'],
                    ['name' => 'Domestic abuse', 'importance' => 95, 'description' => 'Abuse within families or home relationships.'],
                    ['name' => 'Slavery', 'importance' => 90, 'description' => 'Forced labor, ownership, or servitude.'],
                    ['name' => 'Trafficking', 'importance' => 85, 'description' => 'Human trafficking or forced sale of people.'],
                    ['name' => 'Imprisonment', 'importance' => 80, 'description' => 'Locked up or detained against one’s will.'],
                    ['name' => 'Captivity', 'importance' => 75, 'description' => 'Kidnapping, hostage situations, or forced confinement.'],
                    ['name' => 'Bullying', 'importance' => 70, 'description' => 'Harassment, humiliation, or repeated cruelty.'],
                    ['name' => 'Power abuse', 'importance' => 65, 'description' => 'Abuse of authority, rank, or social control.'],
                ],
            ],
            [
                'name' => 'Sexual content and fanservice',
                'importance' => 75,
                'description' => 'Sexually suggestive content, including nudity, explicit scenes, heavy fanservice, voyeurism, and fetishes.',
                'contents' => [
                    ['name' => 'Nudity', 'importance' => 100, 'description' => 'Full or partial nudity.'],
                    ['name' => 'Explicit sex', 'importance' => 95, 'description' => 'Onscreen sex or clearly shown sexual activity.'],
                    ['name' => 'Fanservice', 'importance' => 90, 'description' => 'Sexualized camera work or unnecessary body focus.'],
                    ['name' => 'Sexual jokes', 'importance' => 85, 'description' => 'Jokes built around sexual content or harassment.'],
                    ['name' => 'Fetish content', 'importance' => 80, 'description' => 'Material framed around fetish themes or kinks.'],
                    ['name' => 'Voyeurism', 'importance' => 75, 'description' => 'Watching or spying for sexual purposes.'],
                    ['name' => 'Underwear shots', 'importance' => 70, 'description' => 'Camera framing focused on upskirt shots or underwear.'],
                ],
            ],
            [
                'name' => 'Death and grief',
                'importance' => 72,
                'description' => 'Themes of mortality and mourning, including character deaths, massacres, severe grief, and funerals.',
                'contents' => [
                    ['name' => 'Character death', 'importance' => 100, 'description' => 'Major or minor character deaths.'],
                    ['name' => 'Child death', 'importance' => 95, 'description' => 'Death of a child or child victimization.'],
                    ['name' => 'Parental death', 'importance' => 90, 'description' => 'Death of a parent or parent figure.'],
                    ['name' => 'Grief', 'importance' => 85, 'description' => 'Mourning, loss, and survivor sadness.'],
                    ['name' => 'Survivor guilt', 'importance' => 80, 'description' => 'Characters blaming themselves for surviving.'],
                    ['name' => 'Massacre', 'importance' => 75, 'description' => 'Mass killing or large scale slaughter.'],
                    ['name' => 'Genocide', 'importance' => 70, 'description' => 'Attempted or completed extermination of a group.'],
                    ['name' => 'Funeral scenes', 'importance' => 65, 'description' => 'Funeral, burial, or memorial content.'],
                ],
            ],
            [
                'name' => 'Body and medical content',
                'importance' => 68,
                'description' => 'Medical procedures and bodily functions, including needle use, contagious diseases, pregnancy, and bodily fluids.',
                'contents' => [
                    ['name' => 'Surgery', 'importance' => 100, 'description' => 'Operations or surgical procedures.'],
                    ['name' => 'Injections', 'importance' => 95, 'description' => 'Needles, shots, or forced injections.'],
                    ['name' => 'Disease', 'importance' => 90, 'description' => 'Illness, illness progression, or disease focus.'],
                    ['name' => 'Infection', 'importance' => 85, 'description' => 'Contagion, parasites, or bodily infection.'],
                    ['name' => 'Vomit', 'importance' => 80, 'description' => 'Vomiting or vomit related scenes.'],
                    ['name' => 'Bodily fluids', 'importance' => 75, 'description' => 'Blood, mucus, saliva, or fluid heavy content.'],
                    ['name' => 'Pregnancy', 'importance' => 70, 'description' => 'Pregnancy or pregnancy related themes.'],
                    ['name' => 'Childbirth', 'importance' => 65, 'description' => 'Labor, delivery, or birth scenes.'],
                ],
            ],
            [
                'name' => 'Discrimination and identity hostility',
                'importance' => 65,
                'description' => 'Bigotry and prejudice, including racism, explicit slurs, hate speech, and identity based hostility.',
                'contents' => [
                    ['name' => 'Racism', 'importance' => 100, 'description' => 'Racial prejudice, discrimination, or racist abuse.'],
                    ['name' => 'Species discrimination', 'importance' => 95, 'description' => 'Fantasy prejudice based on species or race analogues.'],
                    ['name' => 'Slurs', 'importance' => 90, 'description' => 'Hateful or degrading language.'],
                    ['name' => 'Transphobic framing', 'importance' => 85, 'description' => 'Hostility or negative framing toward trans people.'],
                    ['name' => 'Misgendering', 'importance' => 80, 'description' => 'Using wrong gender terms on purpose or for ridicule.'],
                    ['name' => 'Homophobic content', 'importance' => 75, 'description' => 'Hostility aimed at queer characters or relationships.'],
                    ['name' => 'Hate speech', 'importance' => 70, 'description' => 'Explicit hateful or dehumanizing dialogue.'],
                    ['name' => 'Prejudice', 'importance' => 65, 'description' => 'General bias, segregation, or discriminatory treatment.'],
                ],
            ],
            [
                'name' => 'Substance use and altered state',
                'importance' => 60,
                'description' => 'Consumption and impact of drugs and alcohol, including addiction, overdose, and forced intoxication.',
                'contents' => [
                    ['name' => 'Alcohol abuse', 'importance' => 100, 'description' => 'Heavy drinking, dependency, or alcohol misuse.'],
                    ['name' => 'Drug use', 'importance' => 95, 'description' => 'Recreational drug use or related scenes.'],
                    ['name' => 'Smoking', 'importance' => 90, 'description' => 'Cigarettes, cigars, or frequent smoking imagery.'],
                    ['name' => 'Overdose', 'importance' => 85, 'description' => 'Drug or substance overdose scenes.'],
                    ['name' => 'Forced drugging', 'importance' => 80, 'description' => 'Characters drugged against their will.'],
                    ['name' => 'Intoxication', 'importance' => 75, 'description' => 'Drunken or drugged behavior and impairment.'],
                    ['name' => 'Dissociation', 'importance' => 70, 'description' => 'Detached, unreal, or dissociative state scenes.'],
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
