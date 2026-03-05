import subprocess, os
os.chdir(r'G:\NF\Nf_TestTool\09_项目研究\CSGO_3C_Breakdown')
with open('_result.txt', 'w', encoding='utf-8') as f:
    # remove temp files from git and amend
    r = subprocess.run('git add -A', shell=True, capture_output=True, text=True, encoding='utf-8')
    f.write(f'add: {r.stdout} {r.stderr}\n')
    r = subprocess.run(['git', 'commit', '--amend', '-m', 'add unit system and formula details'], capture_output=True, text=True, encoding='utf-8')
    f.write(f'amend: {r.stdout} {r.stderr}\n')
    # now do interactive rebase to squash into the previous commit
    # actually let's just reset soft to combine
    r = subprocess.run(['git', 'reset', '--soft', 'HEAD~1'], capture_output=True, text=True, encoding='utf-8')
    f.write(f'reset: {r.stdout} {r.stderr}\n')
    r = subprocess.run(['git', 'commit', '--amend', '-m', 'supplement unit system and formula details'], capture_output=True, text=True, encoding='utf-8')
    f.write(f'final amend: {r.stdout} {r.stderr}\n')
    r = subprocess.run(['git', 'log', '--oneline', '-5'], capture_output=True, text=True, encoding='utf-8')
    f.write(f'log: {r.stdout}\n')
    # push
    r = subprocess.run(['git', 'push', '--force-with-lease'], capture_output=True, text=True, encoding='utf-8')
    f.write(f'push: {r.stdout} {r.stderr}\n')
